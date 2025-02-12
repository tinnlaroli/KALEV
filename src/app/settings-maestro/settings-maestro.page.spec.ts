import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsMaestroPage } from './settings-maestro.page';

describe('SettingsMaestroPage', () => {
  let component: SettingsMaestroPage;
  let fixture: ComponentFixture<SettingsMaestroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMaestroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
