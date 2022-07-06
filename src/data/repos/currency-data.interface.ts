export interface LoadCurrencyDataRepositoryInterface {
  load: () => Promise<LoadCurrencyDataRepository.Output>
}

export namespace LoadCurrencyDataRepository {
  export type Output = null | undefined | {
    id: string
    code: string
    codein: string
    ask: string
    create_date: string
    request_date: string
  }
}
