import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedbufPhysicalListComponent } from './groupedbuf-physical-list.component';

describe('GroupedbufPhysicalListComponent', () => {
  let component: GroupedbufPhysicalListComponent;
  let fixture: ComponentFixture<GroupedbufPhysicalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedbufPhysicalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedbufPhysicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
