import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrders } from './add-orders';

describe('AddOrders', () => {
  let component: AddOrders;
  let fixture: ComponentFixture<AddOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
