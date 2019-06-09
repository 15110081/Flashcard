import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GheptuComponent } from './gheptu.component';

describe('GheptuComponent', () => {
  let component: GheptuComponent;
  let fixture: ComponentFixture<GheptuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GheptuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GheptuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
