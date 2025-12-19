import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationGame } from './presentation-game';

describe('PresentationGame', () => {
  let component: PresentationGame;
  let fixture: ComponentFixture<PresentationGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentationGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
