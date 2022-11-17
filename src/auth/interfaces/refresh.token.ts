import { Users } from 'src/Users/schema/user.schema';
import { Document } from 'mongoose';

export interface RefreshToken extends Document {
  userId: Users;
  refreshToken: string;
  ip: string;
  browser: string;
  country: string;
}
