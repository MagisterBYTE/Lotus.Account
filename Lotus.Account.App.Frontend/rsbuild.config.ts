import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    https: {
      // Укажите пути к созданным сертификатам
      cert: fs.readFileSync(path.resolve(__dirname, "./certificates/localhost.pem")),
      key: fs.readFileSync(path.resolve(__dirname, "./certificates/localhost-key.pem")),
    },
    port: 3000,
    host: "localhost",
  },
  source: {
    entry: {
      index: "./src/index.tsx",
    },
    // Файлы будут выполнены в порядке их следования в массиве
    preEntry: ["./src/init.ts"],
  },
  resolve: {
    alias: {
      react: require.resolve("react"),
      "react-dom": require.resolve("react-dom"),
      "react-router": require.resolve("react-router"),
      "react-router-dom": require.resolve("react-router-dom"),
      "@mantine/core": require.resolve("@mantine/core"),
      "@mantine/notifications": require.resolve("@mantine/notifications"),
    },
  },
  output: {
    sourceMap: {
      js: "source-map",
    },
  },
  tools: {
    rspack: (config) =>
    {
      // Важно для корректной работы source maps с npm link
      config.resolve = {
        ...config.resolve,
        symlinks: false,
      };

      // Игнорировать предупреждения от определенных модулей
      config.stats = {
        warnings: false,
      };

      return config;
    },
  },
  dev: {
    // Для удобства отладки
    client: {
      overlay: false,
    },
  },

  performance: {
    chunkSplit: {
      strategy: "split-by-experience",
      forceSplitting: {
        // Выделить библиотеку axios в отдельный чанк "axios.js"
        axios: /node_modules[\\/]axios/,
        'lotus-core': /node_modules[\\/]lotus-core/,
      },
    },
  },
});
