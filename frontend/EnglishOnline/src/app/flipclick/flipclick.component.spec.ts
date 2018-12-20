import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipclickComponent } from './flipclick.component';

describe('FlipclickComponent', () => {
  let component: FlipclickComponent;
  let fixture: ComponentFixture<FlipclickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipclickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipclickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
