import { Role } from '../../enum/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
/**
 * create @Roles() decorator.
 * This decorator allows specifying
 * what roles are required to access specific resources.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
