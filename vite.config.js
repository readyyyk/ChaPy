import {defineConfig, splitVendorChunkPlugin} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';

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
    plugins: [react(), splitVendorChunkPlugin()],
});
