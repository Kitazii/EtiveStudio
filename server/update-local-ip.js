import os from "os";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (
        iface.family === "IPv4" &&
        !iface.internal &&
        iface.address.match(/^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/)
      ) {
        return iface.address;
      }
    }
  }
  return null;
}

const ip = getLocalIp();
if (!ip) {
  console.error("Could not find local IPv4 address.");
  process.exit(1);
}

const envPath = path.join(__dirname, "..", ".env");
let envContent = "";
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, "utf8");
  envContent = envContent.replace(/^LOCAL_IP=.*$/m, "");
}
envContent += `\nLOCAL_IP=${ip}\n`;
fs.writeFileSync(envPath, envContent.trim() + "\n");

console.log(`Updated .env with LOCAL_IP=${ip}`);