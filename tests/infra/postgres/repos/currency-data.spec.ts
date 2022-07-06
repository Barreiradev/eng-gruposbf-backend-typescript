import { LoadCurrencyDataRepository, LoadCurrencyDataRepositoryInterface } from '@/data/repos/currency-data.interface'
import { getConnection, getRepository, Repository } from 'typeorm'

import { IBackup, IMemoryDb, newDb } from 'pg-mem'
import { PgCurrency } from '@/infra/postgres/entities/currency'

export const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/postgres/entities/currency.ts']
  })
  await connection.synchronize()
  return db
}

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

describe('PgCurrencyDataRepository', () => {
  let sut: PgCurrencyDataRepository
  let pgCurrencyRepo: Repository<PgCurrency>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgCurrency])
    backup = db.backup()
    pgCurrencyRepo = getRepository(PgCurrency)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgCurrencyDataRepository()
  })

  describe('load', () => {
    it('should return currency data from database', async () => {
      async function insertCurrencies (): Promise<any> {
        const currenciesEntities = pgCurrencyRepo.create([
          {
            reskey: 'BRLINR',
            code: 'BRL',
            codein: 'INR',
            ask: '14.65',
            create_date: '2022-07-06 09:54:02'
          },
          {
            reskey: 'BRLEUR',
            code: 'BRL',
            codein: 'EUR',
            ask: '0.182',
            create_date: '2022-07-06 09:54:02'
          },
          {
            reskey: 'BRLUSD',
            code: 'BRL',
            codein: 'USD',
            ask: '0.1851',
            create_date: '2022-07-06 09:54:36'
          }
        ])
        await pgCurrencyRepo.insert(currenciesEntities)
        return currenciesEntities
      }
      await insertCurrencies()

      const findCurrencyData = await sut.load()

      expect(findCurrencyData).toEqual(expect.any(Array))
    })
  })
})
