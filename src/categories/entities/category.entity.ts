import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Debt } from "src/debts/entities/debt.entity";
import { Expense } from "src/expenses/entities/expense.entity";
import { Income } from "src/income/entities/income.entity";
@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    categoryId: string;

    @Column('text')
    name: string;

    @ManyToOne(
        () => User,
        (user) => user.categories
    )
    user: User;

    @OneToMany(
        () => Debt,
        (debt) => debt.category
    )
    debt: Debt;

    @ManyToOne(
        () => Expense,
        (Expense) => Expense.category
    )
    expense: Expense;

    @ManyToOne(
        () => Income,
        (Income) => Income.category
    )
    income: Income;
    

}
