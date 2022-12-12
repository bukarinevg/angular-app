import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullsyncintervalsDialogComponent } from './fullsyncintervals-dialog.component';

describe('FullsyncintervalsDialogComponent', () => {
  let component: FullsyncintervalsDialogComponent;
  let fixture: ComponentFixture<FullsyncintervalsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullsyncintervalsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullsyncintervalsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
