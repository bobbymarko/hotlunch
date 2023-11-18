import AWS from 'aws-sdk'

const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    accessKeyId: 'AKIAUMWGKPR4WQP3L7UH',
    secretAccessKey: '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'
})

export const saveRating = async function handler(req, res) {
  if (req.method === 'POST') {
    const { studentId, rating } = req.body
    const date = new Date().toISOString().slice(0, 10)

    const params = {
      TableName: 'hotlunch',
      Item: {
        'studentid': studentId,
        'date': date,
        'rating': rating
      }
    }

    try {
      await dynamodb.put(params).promise()
      res.status(201).json({ message: 'Rating saved.' })
    } catch (err) {
      console.error(`Error saving rating: ${err}`)
      res.status(500).json({ message: 'Error saving rating.' })
    }
  } else if (req.method === 'GET') {
    const { studentId } = req.query

    const params = {
      TableName: 'hotlunch',
      KeyConditionExpression: 'studentid = :studentId',
      ExpressionAttributeValues: {
        ':studentid': studentId
      }
    }

    try {
      const result = await dynamodb.query(params).promise()
      const ratings = result.Items
      res.status(200).json(ratings)
    } catch (err) {
      console.error(`Error retrieving ratings: ${err}`)
      res.status(500).json({ message: 'Error retrieving ratings.' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' })
  }
}