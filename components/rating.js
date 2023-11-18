import { useState } from 'react'
import { useEffect, useRef } from 'react'
import RatingButton from './ratingButton'
//import { saveRating } from '../pages/api/trash_ratings.js'
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../config/ddbDocClient";

const FoodRating = ({ratingDetected, barcodeData}) => {
  const [rating, setRating] = useState(null)

  const handleRating = async (value) => {
    setRating(value)
    ratingDetected(value) 
    

    // update the database
    const params = {
      TableName: 'hotlunch',
      Item: {
        'studentid': barcodeData,
        'date': new Date().toISOString().slice(0, 10),
        'rating': value
      }
    }
    try {
      const data = await ddbDocClient.send(new PutCommand(params));
      console.log("Success - item added or updated", data);
    } catch(err) {
      console.error("Error", err);
    }

  }

  return (
    <div>

      <div className="flex flex-col justify-center items-center h-screen space-y-5">
        <h2 className="text-3xl">How was your lunch?</h2>
        <div className="flex">
          <RatingButton rating="😋" onRate={() => handleRating('happy')} />
          <RatingButton rating="😐" onRate={() => handleRating('meh')} />
          <RatingButton rating="😞" onRate={() => handleRating('sad')} />
        </div>
      </div>
      {rating && (
        <p>You rated this food as {rating}.</p>
      )}
    </div>
  )
}

export default FoodRating