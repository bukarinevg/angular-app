import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedbufLogicalListComponent } from './groupedbuf-logical-list.component';

describe('GroupedbufLogicalListComponent', () => {
  let component: GroupedbufLogicalListComponent;
  let fixture: ComponentFixture<GroupedbufLogicalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedbufLogicalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedbufLogicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
