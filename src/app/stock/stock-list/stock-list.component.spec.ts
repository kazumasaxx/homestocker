import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { stockListComponent } from './stock-list.component';

describe('stockListComponent', () => {
  let component: stockListComponent;
  let fixture: ComponentFixture<stockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [stockListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(stockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
