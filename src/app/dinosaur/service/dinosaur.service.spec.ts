import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DinosaurService } from './dinosaur.service';

describe('DinosaurService', () => {
  let service: DinosaurService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DinosaurService],
    });
    service = TestBed.inject(DinosaurService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('search()', () => {
    it('should make a post call', () => {
      service.search('testing123').subscribe((response: any) => {
        expect(response).toBeNull();
      });
      const req = httpMock.expectOne(
        'https://dinosaur-facts-api.shultzlab.com/dinosaurs'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(null);
    });
  });
});
