import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('players')
export class Player {
  // 1. Mandatory Fields (Use Exclamation Mark)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name!: string;

  @Column({ name: 'squad_number', type: 'int' })
  squadNumber!: number;

  @Column({ name: 'joined_date', type: 'date' })
  joinedDate!: string;

  @Column({ name: 'former_club', type: 'varchar', length: 100 })
  formerClub!: string;

  @Column({ name: 'is_loan', type: 'boolean' })
  isLoan!: boolean;
}
