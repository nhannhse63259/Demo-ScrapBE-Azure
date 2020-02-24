import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { AuthGuard } from '../../shared/auth.guard';
import { Roles } from '../../shared/roles.decorator';
import { CategoryEntity } from './category.entity';
import { RolesGuard } from '../../shared/roles.guard';
import { CategoryService } from './category.service';

@Crud({
  model: {
    type: CategoryEntity,
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
      scraps: {
        eager: true,
        allow: ['id', 'name'],
      },
    },
    exclude: ['isDeleted'],
  },
})

@Controller('categories')
export class CategoryController {
  constructor(private service: CategoryService) {}
}
