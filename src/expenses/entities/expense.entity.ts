import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Expense {

    @PrimaryGeneratedColumn('uuid')
    expenseId: string;

    @ManyToOne(
        () => User,
        (user) => user.expenses,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
    )
    user: User;

    @Column('text',{
        nullable: true
    })
    concept?: string;

    @Column('float',{ default: 0 })
    amount: number;


    @ManyToOne(
        () => Category,
        (category) => category.expense,
        {nullable: true }
    )
    category: Category;

    @Column()
    creation_date: Date;

    @Column()
    updated_at?: Date;

    @BeforeInsert()
    CreateSpendAt() {
        const date = new Date();
        this.updated_at = date;
    }

    @BeforeUpdate()
    addUpdatedAt() {
        this.updated_at = new Date();
    }

}
