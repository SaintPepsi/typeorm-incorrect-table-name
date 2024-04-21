import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GoalEntity } from './GoalEntity';

@Entity({ name: GoalCategoryEntity.table_name })
export class GoalCategoryEntity extends BaseEntity {
    public static table_name = 'goal_category' as const;

    @PrimaryGeneratedColumn({ type: 'integer' })
    id!: number;

    @Column({ type: 'text', unique: true })
    category!: string;

    @OneToMany(() => GoalEntity, (goal) => goal.id)
    goals!: GoalEntity[];
}
