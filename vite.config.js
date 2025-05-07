import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: resolve(__dirname, './src/'),
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, './src/index.html'),
                error_404: resolve(__dirname, './src/pages/404_error.html'),
                error_500: resolve(__dirname, './src/pages/500_error.html'),
            }
        },
        outDir: resolve(__dirname, 'dist'),
    },
    server: {
        port: 3000
    },
})
