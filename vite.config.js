import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 3030;
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    resolve: {
        alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
    },
    server: { port: PORT, host: true },
    preview: { port: PORT, host: true },
});
