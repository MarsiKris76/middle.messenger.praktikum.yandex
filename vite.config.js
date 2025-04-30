import { defineConfig } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: resolve(__dirname, './src/'),
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, './src/index.html'),
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
    server: {
        port: 3000
    },
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'src/partials'),
    }
    )],
})
