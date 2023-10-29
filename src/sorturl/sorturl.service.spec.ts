import { Test, TestingModule } from '@nestjs/testing';
import { SorturlService } from './sorturl.service';

describe('SorturlService', () => {
  let service: SorturlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorturlService],
    }).compile();

    service = module.get<SorturlService>(SorturlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
