require('dotenv/config')

export const env = {
  serverPort: process.env.APPLICATION_PORT ?? 3333,
  awesomeapiUrl: process.env.AWESOMEAPI_URL
}
