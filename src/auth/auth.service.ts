import { JwtPayload } from './interfaces/jwt.payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { Users } from 'src/Users/schema/user.schema';
import { RefreshToken } from './interfaces/refresh.token';
import { v4 } from 'uuid';
import { Request } from 'express';
import Cryptr = require('cryptr');

@Injectable()
export class AuthService {
  cryptr: any;

  constructor(
    @InjectModel('User') private readonly userModel: Model<Users>,
    @InjectModel('RefreshToken')
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {
    this.cryptr = new Cryptr(process.env.JWT_SECRET);
  }

  async createAccessToken(userId: string): Promise<string> {
    return sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: 6048000 });
  }

  async createRefreshToken(req: Request, userId: string): Promise<string> {
    const refreshToken = new this.refreshTokenModel({
      userId,
      refreshToken: v4(),
      ip: this.getIp(req),
      browser: this.getBrowserInfo(req),
      country: this.getCountry(req),
    });
    await refreshToken.save();
    return refreshToken.refreshToken;
  }

  async findRefreshToken(token: string): Promise<Users> {
    const refreshToken = await this.refreshTokenModel.findOne({
      refreshToken: token,
    });
    if (!refreshToken) {
      throw new UnauthorizedException('User has been logged out.');
    }
    return refreshToken.userId;
  }

  async validateUser(jwtPayload: JwtPayload): Promise<Users> {
    const userId = jwtPayload?.userId ? jwtPayload.userId : jwtPayload._id;
    const user = await this.userModel.findOne({
      _id: userId,
    });
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  private jwtExtractor(request) {
    let token = null;
    if (request.header('Authorization')) {
      token = request.get('Authorization').split(' ')[1];
    }
    return token;
  }

  returnJwtExtractor(): MethodDecorator {
    return this.jwtExtractor;
  }

  getIp(req: Request): string {
    return req.ip;
  }

  getBrowserInfo(req: Request): string {
    return req.header['user-agent'] || 'XX';
  }

  getCountry(req: Request): string {
    return req.header['cf-ipcountry'] ? req.header['cf-ipcountry'] : 'XX';
  }

  encryptText(text: string): string {
    return this.cryptr.encrypt(text);
  }
  
}
