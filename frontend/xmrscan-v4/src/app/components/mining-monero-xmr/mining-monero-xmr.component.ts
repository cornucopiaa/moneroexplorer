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
  templateUrl: './mining-monero-xmr.component.html',
  styleUrl: '../home/home.component.scss'
})
export class MiningMoneroXmrComponent implements AfterViewInit, OnInit{

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

    const description = 'Start mining Monero (XMR) easily with our guide. Learn about the best software, pools, hardware requirements, and setup tips.'
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
          "name": "Can I mine Monero with my PC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Monero was specifically designed to be CPU-minable. Even a mid-range laptop or desktop can start mining with minimal setup. Of course, higher-end CPUs will deliver better hashrates and returns."
          }
        },
        {
          "@type": "Question",
          "name": "Is mining Monero profitable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Profitability depends heavily on your hardware's efficiency, the current Monero price, and your electricity cost. Use mining calculators to estimate profits based on your setup. Keep in mind that Monero’s RandomX algorithm helps maintain mining fairness, preventing large-scale ASIC domination."
          }
        }
      ]
    });
    this.renderer.appendChild(this.document.head, script);
  }
}


