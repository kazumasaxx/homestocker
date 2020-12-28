import { ComponentFixture, TestBed } from '@angular/core/testing';

import { stockAddComponent } from './stock-add.component';

describe('stockAddComponent', () => {
  let component: stockAddComponent;
  let fixture: ComponentFixture<stockAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [stockAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(stockAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
