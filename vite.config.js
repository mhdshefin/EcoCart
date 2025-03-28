import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["jsonwebtoken", "safe-buffer", "buffer"]
  },
  build: {
    rollupOptions: {
      external: ["jsonwebtoken", "safe-buffer", "buffer"]
    }
  }
});
