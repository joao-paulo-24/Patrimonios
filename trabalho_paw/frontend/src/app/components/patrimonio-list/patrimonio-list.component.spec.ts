import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonioListComponent } from './patrimonio-list.component';

describe('PatrimonioListComponent', () => {
  let component: PatrimonioListComponent;
  let fixture: ComponentFixture<PatrimonioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatrimonioListComponent]
    });
    fixture = TestBed.createComponent(PatrimonioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
