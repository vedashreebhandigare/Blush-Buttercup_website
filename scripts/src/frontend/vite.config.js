import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        react(),
    ],
    server: {
        port: 5001,
        host: true
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "declarations": path.resolve(__dirname, "./src/declarations")
        },
    },
});
