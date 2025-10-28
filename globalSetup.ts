import { spawn, ChildProcess } from 'child_process';

let server: ChildProcess;

async function globalSetup() {
  console.log('Iniciando servidor Express...');
  server = spawn('npx', ['ts-node', 'server.ts'], { stdio: 'inherit' });

  // aguarda o servidor subir
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

export default globalSetup;