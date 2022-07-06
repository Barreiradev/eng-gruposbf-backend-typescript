import { PgCurrency } from '@/infra/postgres/entities/currency'
import { PgCurrencyDataRepository } from '@/infra/postgres/repos/currency-data'
import { makeFakeDb } from '../../../mocks/postgres/connection'

import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'

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

      const findCurrencyData = await sut.load() as unknown as PgCurrency[]

      expect(findCurrencyData.length).toBe(3)
    })

    it('should return an empty List if currency data dont exists', async () => {
      const findCurrencyData = await sut.load() as unknown as PgCurrency[]

      expect(findCurrencyData.length).toBe(0)
    })
  })
})
