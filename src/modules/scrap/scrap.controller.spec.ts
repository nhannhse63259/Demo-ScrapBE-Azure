import { Test, TestingModule } from '@nestjs/testing';
import { ScrapController } from './scrap.controller';

describe('Scrap Controller', () => {
  let controller: ScrapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapController],
    }).compile();

    controller = module.get<ScrapController>(ScrapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
