import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmrPriceTrackerComponent } from './xmr-price-tracker.component';

describe('HomeComponent', () => {
  let component: XmrPriceTrackerComponent;
  let fixture: ComponentFixture<XmrPriceTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmrPriceTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmrPriceTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
