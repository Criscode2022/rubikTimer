import { ComponentFixture, TestBed } from '@angular/core/testing';

import { threeComponent } from './three.component';

describe('threeComponent', () => {
  let component: threeComponent;
  let fixture: ComponentFixture<threeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ threeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(threeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
