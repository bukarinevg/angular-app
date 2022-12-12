import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServSetsListComponent } from './serv-sets-list.component';

describe('ServSetsListComponent', () => {
  let component: ServSetsListComponent;
  let fixture: ComponentFixture<ServSetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServSetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServSetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
