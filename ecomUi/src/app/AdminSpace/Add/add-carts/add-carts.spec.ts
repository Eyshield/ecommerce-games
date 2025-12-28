import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarts } from './add-carts';

describe('AddCarts', () => {
  let component: AddCarts;
  let fixture: ComponentFixture<AddCarts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
