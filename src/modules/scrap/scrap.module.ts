import { Module } from '@nestjs/common';
import { ScrapService } from './scrap.service';
import { ScrapController } from './scrap.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapEntity } from './scrap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapEntity])],
  providers: [ScrapService],
  controllers: [ScrapController],
})
export class ScrapModule {}
