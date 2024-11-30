import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteSass from 'vite-plugin-sass';

export default defineConfig({
  plugins: [react(), viteSass()],
});
