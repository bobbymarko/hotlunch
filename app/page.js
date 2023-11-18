'use client';

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'

import FoodRating from '../components/rating'
const Webcam = dynamic(() => import('../components/webcam').then(mod => mod.Webcam), {
  ssr: false
})

const WebcamPage = () => {

  const [showComponent, setShowComponent] = useState(false)
  const [barcodeData, setbarcodeData] = useState(null)

  const handleBarcodeDetected = (data) => {
    setbarcodeData(data)
    setShowComponent(true)
  }

  const [foodRating, setFoodRating] = useState(null)

  const handleFoodRating = (rating) => {
    setFoodRating(rating)
    setShowComponent(false)
  }

  return (
    <div>
      {!showComponent && (
        <Webcam onBarcodeDetected={handleBarcodeDetected} />
      )}
      {showComponent && (
        <div>
          <FoodRating ratingDetected={handleFoodRating} barcodeData={barcodeData}/>
          {foodRating && (
            <p>You rated the food as {foodRating}.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default WebcamPage