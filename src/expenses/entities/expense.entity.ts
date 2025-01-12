import { User } from "src/users/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Expense {

    @PrimaryGeneratedColumn('uuid')
    expenseId: string;

    @ManyToOne(
        () => User,
        (user) => user.expenses
    )
    user: User;

    @Column('text',{
        nullable: true
    })
    concept?: string;

    @Column('float',{ default: 0 })
    amount: number;

    @Column('text',{
        nullable: true
    })
    category?: string;

    @Column()
    creation_date: Date;

    @Column()
    updated_at?: Date;

    @BeforeInsert()
    CreateSpendAt() {
        const date = new Date();
        this.creation_date = date;
        this.updated_at = date;
    }

    @BeforeUpdate()
    addUpdatedAt() {
        this.updated_at = new Date();
    }

}
