import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningMoneroXmrComponent } from './mining-monero-xmr.component';

describe('HomeComponent', () => {
  let component: MiningMoneroXmrComponent;
  let fixture: ComponentFixture<MiningMoneroXmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiningMoneroXmrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiningMoneroXmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
