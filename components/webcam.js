import { useEffect, useRef } from 'react'
import Quagga from '@ericblade/quagga2';

export const Webcam = ({onBarcodeDetected}) => {
    const videoRef = useRef(null)

    useEffect(() => {

        if (videoRef.current) {
          Quagga.init({
              inputStream: {
                  name: 'Live',
                  type: 'LiveStream',
                  target: videoRef.current,
                  constraints: {
                    focusMode: 'continuous'
                  }
              },
              decoder: {
                  readers: ['code_39_reader']
              }
          }, err => {
              if (err) {
                  console.error('error', err)
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
            
            <div ref={videoRef}></div>
            <p>Please scan your lunch tag</p>
        </div>
    )
}