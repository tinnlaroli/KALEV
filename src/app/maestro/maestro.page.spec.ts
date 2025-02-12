import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaestroPage } from './maestro.page';

describe('MaestroPage', () => {
  let component: MaestroPage;
  let fixture: ComponentFixture<MaestroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
