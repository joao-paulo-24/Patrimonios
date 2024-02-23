import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoDetailsComponent } from './evento-details.component';

describe('EventoDetailsComponent', () => {
  let component: EventoDetailsComponent;
  let fixture: ComponentFixture<EventoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventoDetailsComponent]
    });
    fixture = TestBed.createComponent(EventoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
