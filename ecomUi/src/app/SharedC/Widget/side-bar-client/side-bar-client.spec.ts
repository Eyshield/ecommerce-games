import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarClient } from './side-bar-client';

describe('SideBarClient', () => {
  let component: SideBarClient;
  let fixture: ComponentFixture<SideBarClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
