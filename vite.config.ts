import vinext from "vinext";
import { defineConfig } from "vite";
export default defineConfig(async () => {
  const { cloudflare } = await import("@cloudflare/vite-plugin");
  return { plugins: [vinext(), cloudflare({ viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] }, config: { main: "./worker/index.ts", compatibility_flags: ["nodejs_compat"], d1_databases: [{ binding: "DB", database_name: "idees-utiles", database_id: "00000000-0000-4000-8000-000000000000" }] } })] };
});
