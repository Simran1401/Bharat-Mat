import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticComponentComponent } from './static-component.component';

describe('StaticComponentComponent', () => {
  let component: StaticComponentComponent;
  let fixture: ComponentFixture<StaticComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
