import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CanonicalService } from './service/canonical.service';
import { filter } from 'rxjs/operators';

// Google Analytics (gtag.js) global, injected via src/index.html
declare const gtag: (...args: any[]) => void;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'xmrscan-v4';

  // The initial page_view is already sent by the gtag('config') snippet in
  // index.html, so skip the router's first NavigationEnd to avoid double-counting.
  private firstNavigation = true;

  constructor(
    private router: Router,
    private canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    // Set canonical URL on initial load
    this.canonicalService.setCanonicalURL();

    // Update canonical URL on route changes
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.canonicalService.setCanonicalURL();

        // Report client-side (SPA) navigation to GA4.
        if (this.firstNavigation) {
          this.firstNavigation = false;
          return;
        }
        if (typeof gtag === 'function') {
          gtag('event', 'page_view', {
            page_path: event.urlAfterRedirects,
            page_location: window.location.href,
            page_title: document.title
          });
        }
      });
  }
}
