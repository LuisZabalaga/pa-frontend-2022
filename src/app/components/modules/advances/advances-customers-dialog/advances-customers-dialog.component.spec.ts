import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancesCustomersDialogComponent } from './advances-customers-dialog.component';

describe('AdvancesCustomersDialogComponent', () => {
  let component: AdvancesCustomersDialogComponent;
  let fixture: ComponentFixture<AdvancesCustomersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancesCustomersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancesCustomersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
