const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
  searchEmployees
} = require('../controllers/employeeController');
const {
  employeeValidation,
  searchValidation,
  handleValidationErrors,
  validateId
} = require('../middleware/validation');

// GET /api/employees - Get all employees with optional search and pagination
router.get('/', getAllEmployees);

// GET /api/employees/stats - Get employee statistics
router.get('/stats', getEmployeeStats);

// GET /api/employees/:id - Get employee by ID
router.get('/:id', validateId, getEmployeeById);

// POST /api/employees - Create new employee
router.post('/', employeeValidation, handleValidationErrors, createEmployee);

// POST /api/employees/search - Search employees
router.post('/search', searchValidation, handleValidationErrors, searchEmployees);

// PUT /api/employees/:id - Update employee
router.put('/:id', validateId, employeeValidation, handleValidationErrors, updateEmployee);

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', validateId, deleteEmployee);

module.exports = router;


