import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GoalCategoryEntity } from "./GoalCategoryEntity";
import { GoalFrequencyEntity } from "./GoalFrequencyEntity";
import { GoalMethodEntity } from "./GoalMethodEntity";

@Entity({ name: GoalEntity.table_name })
export class GoalEntity extends BaseEntity {
    public static table_name = 'goal' as const;

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int', nullable: true })
    user_id!: number;

    @Column({ type: 'boolean' })
    is_sync_deleted: boolean = false;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => GoalCategoryEntity, (goal_category) => goal_category.id)
    goal_category!: GoalCategoryEntity;

    @ManyToOne(() => GoalFrequencyEntity, (goal_frequency) => goal_frequency.id)
    goal_frequency!: GoalFrequencyEntity;

    @ManyToOne(() => GoalMethodEntity, (goal_method) => goal_method.id)
    goal_method!: GoalMethodEntity;

    @Column({ type: 'integer' })
    desired_goal_amount!: number;

    @Column({ type: 'integer' })
    current_goal_amount!: number;

}