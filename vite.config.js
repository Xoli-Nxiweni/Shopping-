import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import fs from 'fs';
// import path from 'path';

// Load SSL certificates
// eslint-disable-next-line no-undef
// const key = fs.readFileSync(path.resolve(__dirname, 'key.pem'));
// eslint-disable-next-line no-undef
// const cert = fs.readFileSync(path.resolve(__dirname, 'cert.pem'));

export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: {
  //     key,
  //     cert,
  //   },
  //   proxy: {
  //     '/User': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
