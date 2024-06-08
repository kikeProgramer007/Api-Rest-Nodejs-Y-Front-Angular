import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentarealizadaComponent } from './ventarealizada.component';

describe('VentarealizadaComponent', () => {
  let component: VentarealizadaComponent;
  let fixture: ComponentFixture<VentarealizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentarealizadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentarealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
