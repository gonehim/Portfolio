import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split vendor chunks so browsers can cache them independently
        manualChunks: {
          react: ['react', 'react-dom'],
          icons: ['react-icons'],
        },
      },
    },
  },
});
