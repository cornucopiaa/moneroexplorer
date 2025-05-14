import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneroWalletComponent } from './monero-wallet.component';

describe('HomeComponent', () => {
  let component: MoneroWalletComponent;
  let fixture: ComponentFixture<MoneroWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneroWalletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneroWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
