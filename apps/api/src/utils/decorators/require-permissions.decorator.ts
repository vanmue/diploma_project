import { SetMetadata } from '@nestjs/common';
import { ShopsPermission } from 'src/shops/shops.permission';

export const REQUIRE_PERMISSIONS_KEY = 'require-permissions';

export const RequirePermissions = (...permissions: ShopsPermission[]) =>
  SetMetadata(REQUIRE_PERMISSIONS_KEY, permissions);
