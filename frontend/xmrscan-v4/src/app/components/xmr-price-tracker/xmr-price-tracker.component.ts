import {AfterViewInit, Component, Inject, OnInit, Renderer2} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Home } from '../../data/home';
import { HomeService } from '../../service/home.service';
import { filter } from 'rxjs/operators'
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Meta} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './xmr-price-tracker.component.html',
  styleUrl: '../home/home.component.scss'
})
export class XmrPriceTrackerComponent implements AfterViewInit, OnInit{

  loading = true;
  home: Home = {
    blocks: undefined,
    txs: []
  }

  constructor(
    private router: Router,
    private service: HomeService,
    private _snackBar: MatSnackBar,
    private metaService: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects
      ) {
          sessionStorage.clear();
      }
    })
  }

  ngAfterViewInit(): void {
    this.transitionIn();
  }

  getItemsArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index + 1);
  }

  revealSkeletonRow(id: number) {
    document.getElementById('skeleton' + id)?.classList.remove('hidden');
  }

  revealSkeletonRow2(id: number) {
    document.getElementById('skeleton2.' + id)?.classList.remove('hidden');
  }

  reveal() {
    for (let i = 0; i < 22; i++) {
      setTimeout(() => this.revealSkeletonRow(i), 15*i);
      setTimeout(() => this.revealSkeletonRow2(i), 15*i+10);
    }
  }

  transitionOut() {
    document.getElementById('part1')?.classList.add('hidden');
    document.getElementById('part2')?.classList.add('hidden');
  }

  transitionIn() {
    setTimeout(() => document.getElementById('part1')?.classList.remove('hidden'), 100);
    setTimeout(() => document.getElementById('part2')?.classList.remove('hidden'), 100);
    setTimeout(() => scrollTo(0,0), 101);
    setTimeout(() => this.reveal(), 150);
  }

  navigateToBlocks() {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/blocks']), 10);
  }

  navigateToMempool() {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/mempool']), 10);
  }

  navigateToBlock(block: number) {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/block/' + block]), 10);
  }

  navigateToTx(hash: string) {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/transaction/' + hash]), 10);
  }

  loadHome() {
    if (sessionStorage.getItem('home') === null) {
      this.service.getHome().subscribe(
        data => {
          this.home = data;
          this.loading = false;
        },
        error => {
          console.log("error loading home", error);
          this.openSnackBar("Failed to load data!", "Close");
        },
        () => {
          sessionStorage.setItem('home', JSON.stringify(this.home));
        }
      );
    } else {
      this.home = JSON.parse(sessionStorage.getItem('home')!);
      this.loading = false
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.loadHome();

    const description = 'Get real-time Monero (XMR) price updates, market insights, and historical data trends. Learn how to track XMR to USD value using trusted cryptocurrency market tools.'
    this.metaService.updateTag({ name: 'description', content: description});
    this.metaService.updateTag({ name: 'twitter:description', content: description});
    this.metaService.updateTag({ property: 'og:description', content: description});

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Monero’s price highly volatile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, like most cryptocurrencies, Monero’s price experiences significant fluctuations. Its emphasis on privacy can sometimes result in sharper reactions to regulatory news compared to more transparent coins like Bitcoin."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Monero’s price sourced from?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Monero’s price is aggregated from a wide range of cryptocurrency exchanges worldwide. Tools like CoinGecko, CoinMarketCap, and TradingView collect and average prices from dozens of markets to provide accurate data."
          }
        }
      ]
    });
    this.renderer.appendChild(this.document.head, script);
  }
}


