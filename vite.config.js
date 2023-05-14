import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  //edits here
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "react-icons"],
    },
  },
  plugins: [react()],
});
