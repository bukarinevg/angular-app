import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServFieldsDialogComponent } from './serv-fields-dialog.component';

describe('ServFieldsDialogComponent', () => {
  let component: ServFieldsDialogComponent;
  let fixture: ComponentFixture<ServFieldsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServFieldsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServFieldsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
