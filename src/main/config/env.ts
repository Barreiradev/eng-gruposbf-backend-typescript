require('dotenv/config')

export const env = {
  serverPort: process.env.LOCAL_APPLICATION_PORT ?? process.env.PROD_APPLICATION_PORT ?? 3333,
  awesomeapiUrl: process.env.AWESOMEAPI_URL
}
