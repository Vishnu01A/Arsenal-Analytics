import { Entity, Column, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('squad_players')
@Unique('unique_season_player', ['season', 'playerId'])
export class SquadPlayer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'season', type: 'varchar', length: 10 })
  season!: string;

  @Column({ name: 'player_id', type: 'int' })
  playerId!: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name!: string;

  @Column({ name: 'position', type: 'varchar', length: 50, nullable: true })
  position!: string | null;

  @Column({ name: 'nationality', type: 'varchar', length: 100, nullable: true })
  nationality!: string | null;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth!: string | null;

  @Column({ name: 'shirt_number', type: 'int', nullable: true })
  shirtNumber!: number | null;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
