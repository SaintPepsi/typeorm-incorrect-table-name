import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GoalEntity } from './GoalEntity';

@Entity({ name: GoalFrequencyEntity.table_name })
export class GoalFrequencyEntity extends BaseEntity {
    public static table_name = 'goal_frequency' as const;

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text', unique: true })
    frequency!: string;

    @OneToMany(() => GoalEntity, (goal) => goal.id)
    goals!: GoalEntity[];
}
