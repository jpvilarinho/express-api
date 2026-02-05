import express from 'express';
import schema from '../db/schema.js';
import db from '../db/connection.js';

const employees = db.get('employees');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const allEmployees = await employees.find({});
    res.json(allEmployees);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employees.findOne({ _id: id });

    if (!employee) {
      return next(new Error('O empregado não existe!'));
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, job } = await schema.validateAsync(req.body);

    const employee = await employees.findOne({ name });
    if (employee) {
      res.status(409);
      return next(new Error('Employee already exists'));
    }

    const newUser = await employees.insert({ name, job });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await schema.validateAsync(req.body);

    const employee = await employees.findOne({ _id: id });
    if (!employee) {
      return next(); // cai no notFound => 404
    }

    const updatedEmployee = await employees.update(
      { _id: id },
      { $set: result },
      { upsert: false }
    );

    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await employees.findOne({ _id: id });
    if (!employee) {
      return next();
    }

    await employees.remove({ _id: id });

    res.json({ message: 'O empregado foi excluído com sucesso!' });
  } catch (error) {
    next(error);
  }
});

export default router;
