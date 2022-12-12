import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServFieldsComponent } from './serv-fields.component';

describe('ServFieldsComponent', () => {
  let component: ServFieldsComponent;
  let fixture: ComponentFixture<ServFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
