import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 4200,
    host: "localhost",
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "StockWatcher",
        name: "Stock Watcher PWA",
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
        icons: [
          {
            src: "prezzo_icon_48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "prezzo_icon_72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "prezzo_icon_96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "prezzo_icon_192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "prezzo_icon_384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "prezzo_icon_512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "prezzo_icon_1280x720.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "prezzo_icon_720x1280.png", // Ruta a tu captura de pantalla móvil
            sizes: "720x1280",
            type: "image/png",
          },
        ],
      },
      // Especifica la nueva ubicación dentro del directorio public
      filename: "service-worker.js",
      strategies: "injectManifest",
      registerType: "autoUpdate",
      injectRegister: "inline",
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
