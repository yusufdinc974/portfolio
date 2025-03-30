import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add base path for GitHub Pages
  base: './',
  build: {
    // Ensure output directory is dist
    outDir: 'dist',
    // Fix for MIME type issues
    rollupOptions: {
      output: {
        // Ensure proper file extensions
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
});