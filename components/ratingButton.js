import React from 'react'

const RatingButton = ({ rating, onRate }) => {
    

    return (
        <button className="text-6xl" onClick={() => onRate(rating)}>
            {rating}
        </button>
    )
}

export default RatingButton