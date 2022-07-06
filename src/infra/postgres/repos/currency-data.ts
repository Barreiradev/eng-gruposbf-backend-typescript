import { LoadCurrencyDataRepositoryInterface, LoadCurrencyDataRepository } from '@/data/repos/currency-data.interface'
import { getRepository } from 'typeorm'
import { PgCurrency } from '../entities/currency'

export class PgCurrencyDataRepository implements LoadCurrencyDataRepositoryInterface {
  async load (): Promise<LoadCurrencyDataRepository.Output> {
    const rawQuery = `
    SELECT request_date, reskey, code, codein, ask, create_date
    FROM pg_currency
    ORDER BY request_date DESC
    LIMIT 3;`
    const pgCurrencyRepo = getRepository(PgCurrency)
    const findData = await pgCurrencyRepo.query(rawQuery)
    if (findData !== undefined) {
      return findData
    }
  }
}
