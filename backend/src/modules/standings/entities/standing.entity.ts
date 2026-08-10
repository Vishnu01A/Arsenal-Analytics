import { Entity, Column, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('standings')
@Unique('unique_season_team', ['season', 'teamId'])
export class Standing {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'season', type: 'varchar', length: 10 })
  season!: string;

  @Column({ name: 'position', type: 'int' })
  position!: number;

  @Column({ name: 'team_id', type: 'int' })
  teamId!: number;

  @Column({ name: 'team_name', type: 'varchar', length: 100 })
  teamName!: string;

  @Column({ name: 'played', type: 'int' })
  played!: number;

  @Column({ name: 'won', type: 'int' })
  won!: number;

  @Column({ name: 'drawn', type: 'int' })
  drawn!: number;

  @Column({ name: 'lost', type: 'int' })
  lost!: number;

  @Column({ name: 'goals_for', type: 'int' })
  goalsFor!: number;

  @Column({ name: 'goals_against', type: 'int' })
  goalsAgainst!: number;

  @Column({ name: 'goal_difference', type: 'int' })
  goalDifference!: number;

  @Column({ name: 'points', type: 'int' })
  points!: number;

  @Column({ name: 'form', type: 'varchar', length: 20, nullable: true })
  form!: string | null;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
