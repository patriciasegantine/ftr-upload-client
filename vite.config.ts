import {defineConfig, mergeConfig} from 'vite'
import {defineConfig as defineVitestConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

const viteConfig = defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
})

const vitestConfig = defineVitestConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
        css: true,
    },
})

export default mergeConfig(viteConfig, vitestConfig)