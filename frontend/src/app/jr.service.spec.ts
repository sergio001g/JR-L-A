import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JrService } from './jr.service';

describe('Servicio Jr', () => {
  let service: JrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(JrService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
});