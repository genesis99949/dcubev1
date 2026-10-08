import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import remotion from "@remotion/eslint-plugin";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Remotion's rules for video code only (src/remotion/**).
  {
    files: ["src/remotion/**/*.{ts,tsx}"],
    ...remotion.flatPlugin,
    rules: {
      ...remotion.flatPlugin.rules,
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Agent skills (installed by `npx remotion skills add`), not project code:
    ".agents/**",
    ".claude/**",
  ]),
]);

export default eslintConfig;
