import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutofServicePageComponent } from './outof-service-page.component';

describe('OutofServicePageComponent', () => {
  let component: OutofServicePageComponent;
  let fixture: ComponentFixture<OutofServicePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutofServicePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutofServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
