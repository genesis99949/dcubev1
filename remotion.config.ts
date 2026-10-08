// Remotion CLI + Studio configuration.
// All options: https://www.remotion.dev/docs/config
// Every option is also available as a CLI flag: https://www.remotion.dev/docs/cli
// Note: the Node.js APIs (@remotion/renderer) ignore this file — pass options directly there.

import { Config } from "@remotion/cli/config";

// Lets `npx remotion studio` / `npx remotion render <id>` work without passing the entry point.
Config.setEntryPoint("src/remotion/index.ts");

// The website dev server uses :3000, so Studio lives on :3100.
Config.setStudioPort(3100);

// Faster bundling (same setup as the official Remotion Next.js template).
Config.setRspack(true);

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
