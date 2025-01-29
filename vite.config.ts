import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { breakpoints } from './src/constants/breakpoints';

// convert js variables to sass and inject them globally with vite
const sassVariables = Object.entries(breakpoints)
  .map(([key, value]) => `$${key}: ${value};`)
  .join('\n');

export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg?react' })],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `${sassVariables}\n`,
      },
    },
  },
});
