import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import morgan from "morgan";
import { type ViteDevServer, defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

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

const jsonLogFormat: morgan.FormatFn = (tokens, req, res) => {
  return JSON.stringify(
    {
      timestamp: tokens["date"]?.(req, res, "iso"),
      method: tokens["method"]?.(req, res),
      path: tokens["url"]?.(req, res),
      status: tokens["status"]?.(req, res),
      duration: tokens["response-time"]?.(req, res),
    },
    null,
    2,
  );
};

function morganPlugin() {
  return {
    name: "morgan-plugin",
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(morgan(jsonLogFormat));
      };
    },
  };
}
