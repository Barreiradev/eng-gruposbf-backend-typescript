export default class ISOCurrencyCodeError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is not a ISO currency code`)
  }
}
