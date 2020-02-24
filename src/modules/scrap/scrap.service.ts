import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ScrapEntity } from './scrap.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScrapService extends TypeOrmCrudService<ScrapEntity> {
  constructor(@InjectRepository(ScrapEntity) repo) {
    super(repo);
  }
}
