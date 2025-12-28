import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCarts } from './manage-carts';

describe('ManageCarts', () => {
  let component: ManageCarts;
  let fixture: ComponentFixture<ManageCarts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCarts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCarts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
