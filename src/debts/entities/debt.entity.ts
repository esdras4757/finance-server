import { Category } from "src/categories/entities/category.entity";
import { Contact } from "src/contacts/entities/contact.entity";
import { User } from "src/users/entities/user.entity";
import { Income } from "src/income/entities/income.entity";
import { Expense } from "src/expenses/entities/expense.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Debt {
    @PrimaryGeneratedColumn('uuid')
    debtId: string;

    @Column('text')
    concept: string;

    @Column('float')
    amount: number;

    @Column('timestamp',
    { default: () => 'CURRENT_TIMESTAMP' }
    )
    creation_date: Date;

    @Column('timestamp')
    updated_at: Date;

    @Column('text')
    type: string;
    
    @Column('boolean',{
        default: false
    })
    isPaid: boolean;


    
    @BeforeInsert()
    addCreationDate() {
        const date = new Date();
        this.updated_at = date;
        if (this.type === 'to-receive') {
            this.amount = -this.amount;
        }
        else{
            this.amount = this.amount;
        }
    }

    @BeforeUpdate()
    addUpdatedAt() {
        this.updated_at = new Date();
    }

    @ManyToOne(
        () => User,
        (user) => user.debts
    )
    user: User;

    @ManyToOne(
        () => Contact,
        (contact) => contact.debts,
    )
    contact: Contact;

    @ManyToOne(
        () => Category,
        (category) => category.debt,
        {nullable: true }
    )
    category: Category;

}
