import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrders } from './edit-orders';

describe('EditOrders', () => {
  let component: EditOrders;
  let fixture: ComponentFixture<EditOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
