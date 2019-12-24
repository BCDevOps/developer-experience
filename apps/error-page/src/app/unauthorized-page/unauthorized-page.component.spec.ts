import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedPageComponent } from './unauthorized-page.component';

describe('UnauthorizedPageComponent', () => {
  let component: UnauthorizedPageComponent;
  let fixture: ComponentFixture<UnauthorizedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorizedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
