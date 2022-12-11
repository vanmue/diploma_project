import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ShopPoliciesService } from 'src/shops/policies/shop-policies.service';
import { ShopsPermission } from 'src/shops/shops.permission';
import { REQUIRE_PERMISSIONS_KEY } from 'src/utils/decorators/require-permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly shopPoliciesService: ShopPoliciesService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      ShopsPermission[]
    >(REQUIRE_PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const policies = {
      [ShopsPermission.EDIT_SHOP]: () =>
        this.shopPoliciesService.canEditShop(user.id),
      [ShopsPermission.ALL_SHOP]: () =>
        this.shopPoliciesService.canManageShop(user.id),
    };

    let p = Promise.resolve(false);
    requiredPermissions.forEach((permission) => {
      p = p.then(() => policies[permission]());
    });
    return p;
  }
}
