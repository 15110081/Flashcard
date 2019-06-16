import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThienthachComponent } from './thienthach.component';

describe('ThienthachComponent', () => {
  let component: ThienthachComponent;
  let fixture: ComponentFixture<ThienthachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThienthachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThienthachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
