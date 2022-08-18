import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancesDialogComponent } from './advances-dialog.component';

describe('AdvancesDialogComponent', () => {
  let component: AdvancesDialogComponent;
  let fixture: ComponentFixture<AdvancesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
