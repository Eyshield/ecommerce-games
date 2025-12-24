import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Managecategory } from './managecategory';

describe('Managecategory', () => {
  let component: Managecategory;
  let fixture: ComponentFixture<Managecategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Managecategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Managecategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
