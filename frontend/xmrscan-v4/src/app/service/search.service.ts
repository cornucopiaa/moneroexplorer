import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Search } from '../data/search';

// for local replace to '/site-api'
const baseUrl = 'https://moneroexplorer.org/site-api'

@Injectable({
    providedIn: 'root'
  })

  export class SearchService {
    constructor(
        private http: HttpClient
    ) { }

    getSearchResult(query: string | null): Observable<Search> {
        return this.http.get<Search>(`${baseUrl}/search/${query}`);
    }

  }

