import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Debt } from "src/debts/entities/debt.entity";
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
}
