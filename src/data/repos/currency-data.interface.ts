import { PgCurrency } from '@/infra/postgres/entities/currency'

export interface LoadCurrencyDataRepositoryInterface {
  load: () => Promise<LoadCurrencyDataRepository.Output>
}

export namespace LoadCurrencyDataRepository {
  export type Output = null | undefined | PgCurrency[]
}
