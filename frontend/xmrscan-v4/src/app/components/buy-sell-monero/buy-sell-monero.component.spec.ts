import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellMoneroComponent } from './buy-sell-monero.component';

describe('HomeComponent', () => {
  let component: BuySellMoneroComponent;
  let fixture: ComponentFixture<BuySellMoneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuySellMoneroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuySellMoneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
