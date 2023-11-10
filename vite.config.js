import {defineConfig, splitVendorChunkPlugin} from 'vite';
import {VitePWA as vitePWA} from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
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
    plugins: [
        macrosPlugin(),
        react(),
        splitVendorChunkPlugin(),
        vitePWA(manifest),
    ],
});
