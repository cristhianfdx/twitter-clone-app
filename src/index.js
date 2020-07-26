import app from './app';

async function runServer(port) {
  await app.listen(port);
  console.log('Server on port', port);
}

runServer(app.get('port'));
