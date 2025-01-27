import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // Add this line to define process as an empty object (or specific values you need)
    'process.cwd': () => '/',  // Mock process.cwd() for compatibility
  },
});
