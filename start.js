const { spawn } = require('child_process');

const server = spawn('npm', ['run', 'start'], { cwd: 'server', stdio: 'inherit' });
const client = spawn('npm', ['run', 'dev'], { cwd: 'client', stdio: 'inherit' });

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  client.kill();
});

client.on('close', (code) => {
  console.log(`Client process exited with code ${code}`);
  server.kill();
});
