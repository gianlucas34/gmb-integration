require('dotenv/config')
const { google } = require('googleapis')
const axios = require('axios')

const authenticate = async () => {
  const jwt = new google.auth.JWT({
    key: process.env.PRIVATE_KEY,
    email: process.env.CLIENT_EMAIL,
    subject: process.env.CLIENT_EMAIL,
    scopes: ['https://www.googleapis.com/auth/business.manage'],
  })
  const response = await jwt.authorize()

  return response.access_token
}

const getLocations = async () => {
  try {
    const token = await authenticate()
    const response = await axios.get(
      `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${process.env.ACCOUNT_NUMBER}/locations`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )

    console.log(response.data)
  } catch (error) {
    console.log(error.response.data)
  }
}

getLocations()
