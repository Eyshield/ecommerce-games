import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarts } from './edit-carts';

describe('EditCarts', () => {
  let component: EditCarts;
  let fixture: ComponentFixture<EditCarts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCarts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCarts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
