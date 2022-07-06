import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class PgCurrency {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  reskey!: string

  @Column()
  code!: string

  @Column()
  codein!: string

  @Column()
  ask!: string

  @Column()
  create_date!: string

  @CreateDateColumn()
  request_date!: string
}
