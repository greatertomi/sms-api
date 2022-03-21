import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Account} from "./Account";

@Entity()
export class PhoneNumber {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @ManyToOne(() => Account, (account) => account.id)
  account_id: string;
}