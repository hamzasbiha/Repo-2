import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    const tokenExtracted = this.decodeToken(token);

    // Check if tokenExtracted is a valid object with an 'accountType' property
    if (!this.isJwtPayload(tokenExtracted)) {
      return false;
    }

    // Check if the user's role matches any of the required roles
    const requiredRoles = this.getRequiredRoles(context);
    if (
      (requiredRoles && requiredRoles.includes(tokenExtracted.accountType)) ||
      requiredRoles.includes(UserRole.Admin)
    ) {
      return true; // Allow access
    }
    return false; // Deny access if the roles do not match
  }

  decodeToken(token: string) {
    const decoded = this.jwtService.decode(token);
    return decoded;
  }

  isJwtPayload(data: any): data is { accountType: UserRole } {
    return data && data.accountType !== undefined;
  }

  getRequiredRoles(context: ExecutionContext): UserRole[] {
    return this.reflector.get<UserRole[]>('roles', context.getHandler());
  }
}
