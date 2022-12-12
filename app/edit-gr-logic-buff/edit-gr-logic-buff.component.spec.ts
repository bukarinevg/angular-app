import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrLogicBuffComponent } from './edit-gr-logic-buff.component';

describe('EditGrLogicBuffComponent', () => {
  let component: EditGrLogicBuffComponent;
  let fixture: ComponentFixture<EditGrLogicBuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGrLogicBuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGrLogicBuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
