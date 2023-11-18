import { useEffect, useRef } from 'react'
import Quagga from 'quagga'

export const Webcam = ({onBarcodeDetected}) => {
    const videoRef = useRef(null)

    useEffect(() => {

        if (videoRef.current) {
          Quagga.init({
              inputStream: {
                  name: 'Live',
                  type: 'LiveStream',
                  target: videoRef.current
              },
              decoder: {
                  readers: ['code_39_reader'],
                  debug: {
                      drawBoundingBox: true,
                      showFrequency: true,
                      drawScanline: true,
                      showPattern: true
                  }
              }
          }, err => {
              if (err) {
                  console.error(err)
                  return
              }
  
              Quagga.start()
          })
        }

        Quagga.onDetected(data => {
            console.log('Barcode detected:', data.codeResult.code)
            onBarcodeDetected(data.codeResult.code)
        })

        return () => {
            Quagga.stop()
        }
    }, [onBarcodeDetected])

    return (
        <div  className="flex flex-col justify-center items-center h-screen space-y-5">
            
            <video ref={videoRef} width="640" height="480" autoPlay></video>
            <p>Please scan your lunch tag.</p>
        </div>
    )
}