import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardPersonelAccount } from './dash-board-personel-account';

describe('DashBoardPersonelAccount', () => {
  let component: DashBoardPersonelAccount;
  let fixture: ComponentFixture<DashBoardPersonelAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBoardPersonelAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBoardPersonelAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
