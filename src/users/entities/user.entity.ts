import { Category } from "src/categories/entities/category.entity";
import { Contact } from "src/contacts/entities/contact.entity";
import { Expense } from "src/expenses/entities/expense.entity";
import { Income } from "src/income/entities/income.entity";
import { BeforeInsert, BeforeRecover, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Debt } from "src/debts/entities/debt.entity";
@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text',{
        default: false
    })
    isBlocked: boolean;

    @Column('text')
    lastName: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @BeforeInsert()
    addCreatedAt() {
        console.log('before insert');
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    @BeforeUpdate()
    addUpdatedAt() {
        this.updated_at = new Date();
    }

    @OneToMany(
        () => Expense,
        (expense) => expense.user,
        { cascade: true }
    )
    expenses ?: Expense[];

    @OneToMany(
        () => Income,
        (income) => income.user,
        { cascade: true }
    )
    income ?: Income[];

    @OneToMany(
        () => Contact,
        (contact) => contact.user,
        { cascade: true }
    )
    contacts ?: Contact[];

    @OneToMany(
        () => Category,
        (category) => category.user,
        { cascade: true }
    )
    categories ?: string[];

    @BeforeRecover()
    async recoverPassword() {
        delete this.password;
    }

    @OneToMany(
        () => Debt,
        (debt) => debt.user,
        { cascade: true }
    )
    debts ?: Debt[];
}
