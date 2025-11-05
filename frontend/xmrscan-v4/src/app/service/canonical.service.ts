import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: Document) {}

  setCanonicalURL(url?: string) {
    const canURL = url === undefined ? this.dom.URL : url;
    const head = this.dom.querySelector('head');
    let element: HTMLLinkElement | null = this.dom.querySelector(`link[rel='canonical']`) || null;

    if (element === null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      element.setAttribute('rel', 'canonical');
      head?.appendChild(element);
    }

    element.setAttribute('href', canURL);
  }

  removeCanonicalURL() {
    const element: HTMLLinkElement | null = this.dom.querySelector(`link[rel='canonical']`) || null;
    if (element) {
      element.remove();
    }
  }
}
