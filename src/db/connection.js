import monk from 'monk';

let dbUrl = process.env.DB_URL;

if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.TEST_DB_URL;
}

if (!dbUrl) {
  throw new Error('DB_URL não definido. Verifique o arquivo .env na raiz do projeto.');
}

const db = monk(dbUrl, { serverSelectionTimeoutMS: 5000 });

export default db;
