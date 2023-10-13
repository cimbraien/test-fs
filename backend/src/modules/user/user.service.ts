import { inject, injectable } from "inversify";
import { UserRepository } from "./user.repository";
import { User } from "@prisma/client";
import { CreateUserDto, LoginDto } from "./user.dto";
import { ObjectId } from "bson";
import { type } from "../../constants/inversify.constant";
import { BCryptUtil } from "../../utils/bcrypt";
import { UnauthorizedException } from "../../common/exceptions/unauthorized.exception";
import { JWTUtil } from "../../utils/jwt";

@injectable()
export class UserService {
  constructor(@inject(type.UserRepository) private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto): Promise<void> {
    const { email, name } = data;
    const password = await BCryptUtil.hash(data.password);

    const user: User = {
      id: new ObjectId().toString(),
      email,
      password,
      name,
      createdAt: new Date(),
    };

    await this.userRepository.create(user);
  }

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isValidPassword = await BCryptUtil.compare(password, user.password);
    if (!isValidPassword) throw new UnauthorizedException();

    const token = JWTUtil.getToken(user);

    return token;
  }
}
