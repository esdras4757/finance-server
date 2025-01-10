import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    idContact: string;

    @Column('text')
    name: string;

    @Column('text',{
        nullable: true
    })
    lastName: string;

    @Column('text',{
        nullable: true
    })
    email: string;

    @Column('text',{
        nullable: true
    })
    phone: string;

    @ManyToOne(
        () => User,
        (user) => user.contacts
    )
    user: User;

}
