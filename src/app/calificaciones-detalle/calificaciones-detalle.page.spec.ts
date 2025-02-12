import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalificacionesDetallePage } from './calificaciones-detalle.page';

describe('CalificacionesDetallePage', () => {
  let component: CalificacionesDetallePage;
  let fixture: ComponentFixture<CalificacionesDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
