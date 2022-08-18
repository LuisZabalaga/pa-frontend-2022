import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterDialogComponent } from './cash-register-dialog.component';

describe('CashRegisterDialogComponent', () => {
  let component: CashRegisterDialogComponent;
  let fixture: ComponentFixture<CashRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashRegisterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
