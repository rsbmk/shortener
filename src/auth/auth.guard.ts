import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { UserAuth } from 'src/users/entities/user.entity';
import { IS_PUBLIC_KEY } from './auth.module';
export const jwtConstants = {
  expires: '12h',
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * If the route is public, we don't need to check for a JWT token.
     */
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    /**
     * If the route is not public, we'll check for a JWT token.
     */
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })) as UserAuth;

      /**
       * If the token is valid, we'll attach it to the request object and return true.
       * This will allow the user to access the route.
       */
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
