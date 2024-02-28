import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv, type ViteDevServer } from "vite";
import { installGlobals } from "@remix-run/node";
import tsconfigPaths from "vite-tsconfig-paths";
import morgan from "morgan";

installGlobals();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      port: 3000,
    },
    define: {
      "process.env": env,
    },
    plugins: [morganPlugin(), remix(), tsconfigPaths()],
  };
});

function morganPlugin() {
  return {
    name: "morgan-plugin",
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(morgan("tiny"));
      };
    },
  };
}
