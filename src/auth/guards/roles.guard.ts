import {Injectable, ExecutionContext, ForbiddenException,UnauthorizedException,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/Users/schema/user.schema';
  
  @Injectable()
  export class RolesGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
      super();
    }
  
    handleRequest(
      user: Users,
      context: ExecutionContext,
    ): any {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) {
        return true;
      }
      const hasRole = () => user.roles.some((role) => roles.includes(role));
      if (!user) {
        throw new UnauthorizedException();
      }
      if (!(user.roles && hasRole())) {
        throw new ForbiddenException('Forbidden');
      }
      if (user && user.roles && hasRole()) return user;
      else return false;
    }
  }
  
  