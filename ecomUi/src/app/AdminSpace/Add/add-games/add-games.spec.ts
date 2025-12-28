import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGames } from './add-games';

describe('AddGames', () => {
  let component: AddGames;
  let fixture: ComponentFixture<AddGames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGames]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGames);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
