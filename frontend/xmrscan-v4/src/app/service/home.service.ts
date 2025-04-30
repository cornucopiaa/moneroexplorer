import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Home } from '../data/home';

// for local replace to '/site-api'
const baseUrl = 'https://moneroexplorer.org/site-api'

@Injectable({
    providedIn: 'root'
  })

  export class HomeService {
    constructor(
        private http: HttpClient
    ) { }

    getHome(): Observable<Home> {
        return this.http.get<Home>(`${baseUrl}/`);
    }
  }

