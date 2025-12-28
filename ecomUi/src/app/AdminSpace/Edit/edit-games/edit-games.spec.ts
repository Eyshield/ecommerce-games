import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGames } from './edit-games';

describe('EditGames', () => {
  let component: EditGames;
  let fixture: ComponentFixture<EditGames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGames]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGames);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
