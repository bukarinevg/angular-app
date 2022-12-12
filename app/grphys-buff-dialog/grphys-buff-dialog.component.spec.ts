import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrphysBuffDialogComponent } from './grphys-buff-dialog.component';

describe('GrphysBuffDialogComponent', () => {
  let component: GrphysBuffDialogComponent;
  let fixture: ComponentFixture<GrphysBuffDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrphysBuffDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrphysBuffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
