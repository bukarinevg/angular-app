import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServSetsAddComponent } from './serv-sets-add.component';

describe('ServSetsAddComponent', () => {
  let component: ServSetsAddComponent;
  let fixture: ComponentFixture<ServSetsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServSetsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServSetsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
