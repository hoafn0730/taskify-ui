import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), eslint(), basicSsl()],
    resolve: {
        alias: [{ find: '~', replacement: '/src' }],
    },
});
