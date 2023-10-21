import {defineConfig, splitVendorChunkPlugin} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';

import manifest from './manifest.js';


// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                nested: resolve(__dirname, 'index.html'),
            },
        },
    },
    workbox: {
        importScripts: ['./setupNotification'],
    },
    plugins: [react(), splitVendorChunkPlugin(), VitePWA(manifest)],
});
