import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

}
