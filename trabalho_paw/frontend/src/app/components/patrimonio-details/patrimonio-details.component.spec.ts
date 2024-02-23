import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonioDetailsComponent } from './patrimonio-details.component';

describe('PatrimonioDetailsComponent', () => {
  let component: PatrimonioDetailsComponent;
  let fixture: ComponentFixture<PatrimonioDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatrimonioDetailsComponent]
    });
    fixture = TestBed.createComponent(PatrimonioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
