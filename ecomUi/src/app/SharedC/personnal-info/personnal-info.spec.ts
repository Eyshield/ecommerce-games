import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalInfo } from './personnal-info';

describe('PersonnalInfo', () => {
  let component: PersonnalInfo;
  let fixture: ComponentFixture<PersonnalInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnalInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnalInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
