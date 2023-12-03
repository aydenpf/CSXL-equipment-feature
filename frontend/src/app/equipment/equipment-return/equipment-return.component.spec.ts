import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentReturnComponent } from './equipment-return.component';

describe('EquipmentReturnComponent', () => {
  let component: EquipmentReturnComponent;
  let fixture: ComponentFixture<EquipmentReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
