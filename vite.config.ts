import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target:
          "http://sprint-project-1196140422.ap-northeast-2.elb.amazonaws.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
});
