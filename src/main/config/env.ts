require('dotenv/config')

export const env = {
  serverPort: process.env.LOCAL_APPLICATION_PORT ?? process.env.PORT ?? 3333,
  awesomeapiUrl: process.env.AWESOMEAPI_URL
}
