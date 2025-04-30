import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BlocksMempoolComponent } from './components/blocks-mempool/blocks-mempool.component';
import { BlockComponent } from './components/block/block.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, title: 'Monero Block Explorer | moneroexplorer'},
    {path: 'blocks', component: BlocksMempoolComponent, data: {mode: 0}, title: 'Blocks | moneroexplorer'},
    {path: 'mempool', component: BlocksMempoolComponent, data: {mode: 1}, title: 'Mempool | moneroexplorer'},
    {path: 'block/:height', component: BlockComponent, title: 'Block | moneroexplorer'},
    {path: 'transaction/:hash', component: TransactionComponent, title: 'Transaction | moneroexplorer'},
    {path: '**', component: PageNotFoundComponent, title: '404 Page Not Found | moneroexplorer'}
];
