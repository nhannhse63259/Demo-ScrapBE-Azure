import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ScrapService } from './scrap.service';
import { ScrapEntity } from './scrap.entity';
import { AuthGuard } from '../../shared/auth.guard';
import { Roles } from '../../shared/roles.decorator';
import { RolesGuard } from '../../shared/roles.guard';

@Crud({
  model: {
    type: ScrapEntity,
  },
  routes: {
    only: ['getManyBase', 'createOneBase'],
    getManyBase: {
      decorators: [UseGuards(AuthGuard)],
    },
    createOneBase: {
      decorators: [Roles(1), UseGuards(AuthGuard, RolesGuard)],
    },
  },
  query: {
    join: {
      category: {
        eager: true,
        allow: ['id', 'type']
      },
    },
    exclude: ['isDeleted']
  },
})
@Controller('scraps')
export class ScrapController {
  constructor(private service: ScrapService) {}
}
