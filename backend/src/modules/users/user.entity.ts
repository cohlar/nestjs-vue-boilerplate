import { Entity, Column } from "typeorm";
import { BaseModel } from "src/common/common.entity";

@Entity()
export class User extends BaseModel {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
