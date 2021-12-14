import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USER' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'SURNAME' })
  surname: string;

  @Column({ name: 'HEIGHT', nullable: true })
  height: number;

  @Column({ name: 'WEIGHT', nullable: true })
  weight: number;

  @Column({ name: 'EMAIL' })
  email: string;
}
