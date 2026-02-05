import 'dotenv/config';

const port = process.env.PORT || 8080;

console.log('Iniciando servidor...');
console.log('PORT =', port);
console.log('DB_URL =', process.env.DB_URL);

const { default: db } = await import('./db/connection.js');
const { default: app } = await import('./app.js');

function connectMongo(monkDb) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Timeout conectando ao MongoDB (5s).'));
    }, 5000);

    monkDb.once('open', () => {
      clearTimeout(timeout);
      resolve();
    });

    monkDb.once('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

try {
  await connectMongo(db);
  console.log('MongoDB conectado');

  app.listen(port, () => {
    console.log(`Escutando a porta ${port}`);
  });
} catch (err) {
  console.error('Falha ao iniciar:', err?.message || err);
  process.exit(1);
}
