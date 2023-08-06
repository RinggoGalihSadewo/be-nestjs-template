import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModel } from '../users/users.entity';
import 'dotenv/config';
import { RoleModel } from '../role/role.entity';

type JwtPayload = {
  sub: number;
  username: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(UsersModel)
    private readonly usersRepositories: typeof UsersModel,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersRepositories.findOne({
      where: { id: payload.sub },
      attributes: { exclude: ['password'] },
      include: [RoleModel],
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
