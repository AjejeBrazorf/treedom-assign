import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeProgressIndicatorComponent } from './tree-progress-indicator.component';

describe('TreeProgressIndicatorComponent', () => {
  let component: TreeProgressIndicatorComponent;
  let fixture: ComponentFixture<TreeProgressIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeProgressIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
