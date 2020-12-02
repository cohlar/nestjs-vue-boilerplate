import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { UserDto } from "../users/user.dto";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const matchPassword = await bcrypt.compare(pass, user.password);
    if (!matchPassword) {
      return null;
    }

    const { password, ...result } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
    return result;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async create(user: UserDto) {
    const pass = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.create({ ...user, password: pass });
    const { password, ...result } = newUser; // eslint-disable-line @typescript-eslint/no-unused-vars
    const token = this.jwtService.sign(result);
    return { user: result, token };
  }
}
