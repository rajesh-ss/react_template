import path from 'path';
// import react from "@vitejs/plugin-react"
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig({
	plugins: [react()],
	// base:'/cybergpt/',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@picquest': path.resolve(__dirname, './src/app/pic_quest'),
			'@layout': path.resolve(__dirname, './src/layout'),
		},
	},
});
