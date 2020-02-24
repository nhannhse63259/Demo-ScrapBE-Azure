import { Controller, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Crud } from '@nestjsx/crud';
import { AuthGuard } from '../../shared/auth.guard';
import { Roles } from '../../shared/roles.decorator';
import { RoleEntity } from './role.entity';
import { RolesGuard } from '../../shared/roles.guard';

@Crud({
  model: {
    type: RoleEntity,
  },
  routes: {
    only: ['getManyBase', 'createOneBase'],
    getManyBase: {
      decorators: [Roles(1), UseGuards(AuthGuard, RolesGuard)],
    },
    createOneBase: {
      decorators: [Roles(1), UseGuards(AuthGuard, RolesGuard)],
    },
  },
  query: {
    join: {
      accounts: {
        eager: true,
      },
    },
    exclude: ['isDeleted'],
  },
})
@Controller('roles')
export class RoleController {
  constructor(private service: RoleService) {}
}
