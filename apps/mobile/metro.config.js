  const { getDefaultConfig } = require("expo/metro-config");
  const { withNativeWind } = require("nativewind/metro");
  const path = require("path");

  const projectRoot = __dirname;                             //  = .../apps/mobile
  const workspaceRoot = path.resolve(projectRoot, "../.."); // = monorepo root (sherpa/)

  const config = getDefaultConfig(projectRoot);

  config.watchFolders = [workspaceRoot];

  // It checks apps/mobile/node_modules first, then falls back to root node_modules
  // (where yarn hoisted @sherpa/shared to)
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
  ];

  module.exports = withNativeWind(config, { input: "./src/global.css" });