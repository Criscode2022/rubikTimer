import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabResultsComponent } from './tab-results.component';

describe('TabResultsComponent', () => {
  let component: TabResultsComponent;
  let fixture: ComponentFixture<TabResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabResultsComponent]
    });
    fixture = TestBed.createComponent(TabResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
