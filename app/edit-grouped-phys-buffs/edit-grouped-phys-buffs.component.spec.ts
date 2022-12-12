import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupedPhysBuffsComponent } from './edit-grouped-phys-buffs.component';

describe('EditGropedPhysBuffsComponent', () => {
  let component: EditGroupedPhysBuffsComponent;
  let fixture: ComponentFixture<EditGroupedPhysBuffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroupedPhysBuffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupedPhysBuffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
