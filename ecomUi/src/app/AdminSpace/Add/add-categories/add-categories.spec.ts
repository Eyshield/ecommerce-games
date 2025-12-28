import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategories } from './add-categories';

describe('AddCategories', () => {
  let component: AddCategories;
  let fixture: ComponentFixture<AddCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
