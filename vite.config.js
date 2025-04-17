import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const PORT = 3030
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: '~', replacement: '/src' }],
    },
    server: { port: PORT, host: true },
    preview: { port: PORT, host: true },
})
