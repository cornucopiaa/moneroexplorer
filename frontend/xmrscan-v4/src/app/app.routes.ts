import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BlocksMempoolComponent } from './components/blocks-mempool/blocks-mempool.component';
import { BlockComponent } from './components/block/block.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {MoneroWalletComponent} from './components/monero-wallet/monero-wallet.component';
import {BuySellMoneroComponent} from './components/buy-sell-monero/buy-sell-monero.component';
import {MiningMoneroXmrComponent} from './components/mining-monero-xmr/mining-monero-xmr.component';
import {XmrPriceTrackerComponent} from './components/xmr-price-tracker/xmr-price-tracker.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, title: 'Analyze Monero Blockchain & Track XMR Transactions | MoneroExplorer'},
    {path: 'blocks', component: BlocksMempoolComponent, data: {mode: 0}, title: 'Monero (XMR) Blockchain Explorer – Latest Blocks | MoneroExplorer'},
    {path: 'mempool', component: BlocksMempoolComponent, data: {mode: 1}, title: 'Monero Mempool – Pending Transactions | MoneroExplorer'},
    {path: 'block/:height', component: BlockComponent, title: 'Monero Block Overview – Block #{block-number} | MoneroExplorer'},
    {path: 'transaction/:hash', component: TransactionComponent, title: 'Monero Transaction Overview – {transaction-hash} | MoneroExplorer'},
    {path: 'insights/monero-wallet', component: MoneroWalletComponent, title: 'Best Tools to Manage Monero (XMR) Wallets: Lookup, Verify & Track | MoneroExplorer'},
    {path: 'insights/buy-sell-monero', component: BuySellMoneroComponent, title: 'How to Buy and Sell Monero (XMR) Safely: Step-by-Step Guide | MoneroExplorer'},
    {path: 'insights/mining-monero-xmr', component: MiningMoneroXmrComponent, title: 'How to Mine Monero (XMR) Tutorial: Mining Pools, Software & Setup | MoneroExplorer'},
    {path: 'insights/xmr-price-tracker', component: XmrPriceTrackerComponent, title: 'Monero (XMR) Price Today: Live Updates & Market Trends'},
    {path: '**', component: PageNotFoundComponent, title: '404 Page Not Found | moneroexplorer'}
];
