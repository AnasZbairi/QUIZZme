import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // Ensure the root is set correctly
  build: {
    outDir: 'dist', // Output directory for the production build
    emptyOutDir: true, // Clear the output directory before building
  },
});
