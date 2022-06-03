import {crx, defineManifest} from '@crxjs/vite-plugin';
import react from "@vitejs/plugin-react";
import {defineConfig} from 'vite';

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Loom Assistant',
  version: '0.1.0',
  permissions: ["storage"],
  host_permissions: ["https://www.loom.com/share/*"],
  options_page: "src/Options/index.html",
  content_scripts: [{
    matches: ["https://www.loom.com/share/*"],
    js: ['src/Content/loom.contentScript.ts']
  }]
})

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  optimizeDeps: {
    entries: ["src/*.html"],
  },
});
