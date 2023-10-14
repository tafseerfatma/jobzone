import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobsComponent } from './search-jobs.component';

describe('SearchJobsComponent', () => {
  let component: SearchJobsComponent;
  let fixture: ComponentFixture<SearchJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchJobsComponent]
    });
    fixture = TestBed.createComponent(SearchJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
