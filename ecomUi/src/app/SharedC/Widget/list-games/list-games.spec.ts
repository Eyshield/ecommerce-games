import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGames } from './list-games';

describe('ListGames', () => {
  let component: ListGames;
  let fixture: ComponentFixture<ListGames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGames]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGames);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
