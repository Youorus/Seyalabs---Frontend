import { cp, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import nextEnv from '@next/env';

const root = new URL('../', import.meta.url);
nextEnv.loadEnvConfig(new URL('../', import.meta.url).pathname, false);
const standalone = new URL('.next/standalone/', root);
try {
  await access(new URL('server.js', standalone));
} catch {
  console.error('Build standalone absent. Exécutez npm run build avant npm start.');
  process.exit(1);
}
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || !['--port', '-p'].includes(args[0]))) {
  console.error('Usage : npm start [-- --port 3100]');
  process.exit(1);
}
const port = args[1] || process.env.PORT || '3000';
if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) {
  console.error('Le port doit être compris entre 1 et 65535.');
  process.exit(1);
}
await cp(new URL('public/', root), new URL('public/', standalone), { recursive: true, force: true });
await cp(new URL('.next/static/', root), new URL('.next/static/', standalone), { recursive: true, force: true });
const server = spawn(process.execPath, ['server.js'], {
  cwd: standalone,
  env: { ...process.env, PORT: port, HOSTNAME: process.env.LISTEN_HOST || '0.0.0.0' },
  stdio: 'inherit',
});
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.kill(signal));
server.once('error', (error) => { console.error(error.message); process.exit(1); });
server.once('exit', (code, signal) => process.exit(code ?? (signal ? 1 : 0)));
