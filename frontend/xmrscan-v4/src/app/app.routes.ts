import { Routes } from '@angular/router';

// Keep HomeComponent eagerly loaded as it's the entry point
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, title: 'Analyze Monero Blockchain & Track XMR Transactions | MoneroExplorer'},
    {
        path: 'blocks',
        loadComponent: () => import('./components/blocks-mempool/blocks-mempool.component').then(m => m.BlocksMempoolComponent),
        data: {mode: 0},
        title: 'Monero (XMR) Blockchain Explorer – Latest Blocks | MoneroExplorer'
    },
    {
        path: 'mempool',
        loadComponent: () => import('./components/blocks-mempool/blocks-mempool.component').then(m => m.BlocksMempoolComponent),
        data: {mode: 1},
        title: 'Monero Mempool – Pending Transactions | MoneroExplorer'
    },
    {
        path: 'block/:height',
        loadComponent: () => import('./components/block/block.component').then(m => m.BlockComponent),
        title: 'Monero Block Overview – Block #{block-number} | MoneroExplorer'
    },
    {
        path: 'transaction/:hash',
        loadComponent: () => import('./components/transaction/transaction.component').then(m => m.TransactionComponent),
        title: 'Monero Transaction Overview – {transaction-hash} | MoneroExplorer'
    },
    {
        path: 'insights/monero-wallet',
        loadComponent: () => import('./components/monero-wallet/monero-wallet.component').then(m => m.MoneroWalletComponent),
        title: 'Best Tools to Manage Monero (XMR) Wallets: Lookup, Verify & Track | MoneroExplorer'
    },
    {
        path: 'insights/buy-sell-monero',
        loadComponent: () => import('./components/buy-sell-monero/buy-sell-monero.component').then(m => m.BuySellMoneroComponent),
        title: 'How to Buy and Sell Monero (XMR) Safely: Step-by-Step Guide | MoneroExplorer'
    },
    {
        path: 'insights/mining-monero-xmr',
        loadComponent: () => import('./components/mining-monero-xmr/mining-monero-xmr.component').then(m => m.MiningMoneroXmrComponent),
        title: 'How to Mine Monero (XMR) Tutorial: Mining Pools, Software & Setup | MoneroExplorer'
    },
    {
        path: 'insights/xmr-price-tracker',
        loadComponent: () => import('./components/xmr-price-tracker/xmr-price-tracker.component').then(m => m.XmrPriceTrackerComponent),
        title: 'Monero (XMR) Price Today: Live Updates & Market Trends'
    },
    {
        path: '**',
        loadComponent: () => import('./components/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
        title: '404 Page Not Found | moneroexplorer'
    }
];
