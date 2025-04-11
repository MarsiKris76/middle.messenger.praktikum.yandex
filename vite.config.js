import { defineConfig } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: resolve(__dirname, '.'),
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                error_404: resolve(__dirname, './src/pages/404_error.html'),
                error_500: resolve(__dirname, './src/pages/500_error.html'),
                chat_list: resolve(__dirname, './src/pages/chat_list.html'),
                login: resolve(__dirname, './src/pages/login.html'),
                profile: resolve(__dirname, './src/pages/profile.html'),
                registration: resolve(__dirname, './src/pages/registration.html'),
            }
        },
        outDir: resolve(__dirname, 'dist'),
    },
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
    }
    )],
})