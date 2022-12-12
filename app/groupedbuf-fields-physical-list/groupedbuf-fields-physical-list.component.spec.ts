import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedbufFieldsPhysicalListComponent } from './groupedbuf-fields-physical-list.component';

describe('GroupedbufFieldsPhysicalListComponent', () => {
  let component: GroupedbufFieldsPhysicalListComponent;
  let fixture: ComponentFixture<GroupedbufFieldsPhysicalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedbufFieldsPhysicalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedbufFieldsPhysicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
