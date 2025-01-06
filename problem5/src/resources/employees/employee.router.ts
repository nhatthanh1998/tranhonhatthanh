import express, { Request, Response } from 'express';
import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, EmployeeFilter } from './employee.service';
import { EmployeeDocument, Role } from '../../models/employee.model';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { fullName, role } = req.body;
  if (!fullName) {
    res.status(400).json({ error: 'Fullname is required' });
    return
  }
  if (!role) {
    res.status(400).json({ error: 'Role is required' });
    return
  }
  if (!(role in Role)) {
    res.status(400).json({ error: 'Role must be FullStack | Frontend | Backend' });
    return
  }

  const data: EmployeeDocument = { fullName, role } as EmployeeDocument

  const newEmployee = createEmployee(data);
  res.status(201).json(newEmployee);
  return
});

router.get('/', async (req: Request, res: Response) => {
  const { fullName, role } = req.query;
  const filter: EmployeeFilter = {};


  if (fullName) {
    filter.fullName = fullName as string;
  }

  if (role && Object.values(Role).includes(role as any)) {
    filter.role = role as Role;
  }

  const employees = await getEmployees(filter);
  res.json(employees)
  return
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await getEmployeeById(id);

  if (!employee) {
    res.status(404).json({ error: 'Employee not found' });
    return
  }
  res.status(200).json(employee);
  return
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, role } = req.body;
  if (!fullName) {
    res.status(400).json({ error: 'Fullname is required' });
    return
  }
  if (!role) {
    res.status(400).json({ error: 'Role is required' });
    return
  }
  if (!(role in Role)) {
    res.status(400).json({ error: 'Role must be FullStack | Frontend | Backend' });
    return
  }
  const data: EmployeeDocument = { fullName, role } as EmployeeDocument
  const updatedEmployee = await updateEmployee(id, data);
  if (!updatedEmployee) {
    res.status(404).json({ error: 'Employee not found' });
    return
  }
  res.status(200).json(updatedEmployee);
  return
});

router.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, role } = req.body;
  const data: {role?: string, fullName?: string} = {}
  if (role && !(role in Role)) {
    res.status(400).json({ error: 'Role must be FullStack | Frontend | Backend' });
    return
  } else {
    data.role = role
  }
  if (fullName) {
    data.fullName = fullName
  }
  const updatedEmployee = await updateEmployee(id, data as EmployeeDocument);
  if (!updatedEmployee) {
    res.status(404).json({ error: 'Employee not found' });
    return
  }
  res.status(200).json(updatedEmployee);
  return
});


router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const isDeleted = deleteEmployee(id);

  if (!isDeleted) {
    res.status(404).json({ error: 'Employee not found' });
  }
  res.sendStatus(204).json({ message: `Employee with id is ${id} deleted!` });
  return
});

export default router;
