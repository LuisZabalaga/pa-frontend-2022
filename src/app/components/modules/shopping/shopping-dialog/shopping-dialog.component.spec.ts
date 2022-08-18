import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingDialogComponent } from './shopping-dialog.component';

describe('ShoppingDialogComponent', () => {
  let component: ShoppingDialogComponent;
  let fixture: ComponentFixture<ShoppingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
