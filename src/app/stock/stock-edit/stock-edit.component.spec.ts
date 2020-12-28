import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { stockEditComponent } from './stock-edit.component';

describe('stockEditComponent', () => {
  let component: stockEditComponent;
  let fixture: ComponentFixture<stockEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [stockEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(stockEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
