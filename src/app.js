import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { notFound, errorHandler } from './middlewares/index.js';
import employees from './routes/employees.js';


const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/employees', employees);

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'express-employees-api',
    endpoints: {
      employees: '/api/employees',
    },
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
