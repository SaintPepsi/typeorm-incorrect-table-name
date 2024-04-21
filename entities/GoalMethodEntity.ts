import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GoalEntity } from './GoalEntity';

@Entity({ name: GoalMethodEntity.table_name })
export class GoalMethodEntity extends BaseEntity {
    public static table_name = 'goal_method' as const;

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text', unique: true })
    method!: string;

    @OneToMany(() => GoalEntity, (goal) => goal.id)
    goals!: GoalEntity[];
}
