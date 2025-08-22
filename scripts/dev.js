#!/usr/bin/env node
/** Simple dev script: watch content/ and templates/ and rebuild */
const chokidar = require("chokidar");
const { spawn } = require("child_process");
let building = false;
let queued = false;

function runBuild() {
  if (building) {
    queued = true;
    return;
  }
  building = true;
  const proc = spawn("node", ["scripts/build.js"], { stdio: "inherit" });
  proc.on("exit", () => {
    building = false;
    if (queued) {
      queued = false;
      runBuild();
    }
  });
}

console.log("[dev] Watching for changes...");
runBuild();
chokidar
  .watch(["content", "templates"], { ignoreInitial: true })
  .on("all", () => {
    runBuild();
  });
