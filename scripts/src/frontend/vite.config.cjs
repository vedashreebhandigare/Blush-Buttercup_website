const react = require("@vitejs/plugin-react").default;
const { defineConfig } = require("vite");
const path = require("node:path");

module.exports = defineConfig({
    plugins: [
        react(),
    ],
    server: {
        port: 3001
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "declarations": path.resolve(__dirname, "./src/declarations")
        }
    }
});
