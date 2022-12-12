import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgrbufsComponent } from './editgrbufs.component';

describe('EditgrbufsComponent', () => {
  let component: EditgrbufsComponent;
  let fixture: ComponentFixture<EditgrbufsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditgrbufsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditgrbufsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
