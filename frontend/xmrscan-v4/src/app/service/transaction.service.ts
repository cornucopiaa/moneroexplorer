import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { ProveResults, Transaction } from '../data/transaction';

// for local replace to '/site-api'
const baseUrl = 'https://moneroexplorer.org/site-api'

@Injectable({
    providedIn: 'root'
  })

  export class TransactionService {
    constructor(
        private http: HttpClient
    ) { }

    getTransaction(hash: string): Observable<Transaction> {
        return this.http.get<Transaction>(`${baseUrl}/transaction/${hash}`);
    }

    proveTransaction(hash: string, address: string, key: string, mode: number): Observable<ProveResults> {
        return this.http.get<ProveResults>(`${baseUrl}/prove/${hash}/${address}/${key}/${mode}`);
    }
  }

