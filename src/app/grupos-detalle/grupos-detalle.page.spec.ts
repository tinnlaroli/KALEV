import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GruposDetallePage } from './grupos-detalle.page';

describe('GruposDetallePage', () => {
  let component: GruposDetallePage;
  let fixture: ComponentFixture<GruposDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
