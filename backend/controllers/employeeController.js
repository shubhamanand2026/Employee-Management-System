const Employee = require('../models/Employee');

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const { search, department, page = 1, limit = 10 } = req.query;
    let employees;

    if (search) {
      employees = await Employee.search(search);
    } else if (department) {
      employees = await Employee.getByDepartment(department);
    } else {
      employees = await Employee.getAll();
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedEmployees = employees.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedEmployees,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(employees.length / limit),
        totalEmployees: employees.length,
        hasNext: endIndex < employees.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employees',
      error: error.message
    });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.getById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employee',
      error: error.message
    });
  }
};

// Create new employee
const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    const employeeId = await Employee.create(employeeData);
    const newEmployee = await Employee.getById(employeeId);

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: newEmployee
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    
    if (error.message === 'Email already exists') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating employee',
      error: error.message
    });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeData = req.body;

    // Check if employee exists
    const existingEmployee = await Employee.getById(id);
    if (!existingEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const updated = await Employee.update(id, employeeData);
    
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'Failed to update employee'
      });
    }

    const updatedEmployee = await Employee.getById(id);

    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: updatedEmployee
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    
    if (error.message === 'Email already exists') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating employee',
      error: error.message
    });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if employee exists
    const existingEmployee = await Employee.getById(id);
    if (!existingEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const deleted = await Employee.delete(id);
    
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete employee'
      });
    }

    res.json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting employee',
      error: error.message
    });
  }
};

// Get employee statistics
const getEmployeeStats = async (req, res) => {
  try {
    const stats = await Employee.getStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

// Search employees
const searchEmployees = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const employees = await Employee.search(searchTerm);

    res.json({
      success: true,
      data: employees,
      message: `Found ${employees.length} employee(s) matching "${searchTerm}"`
    });
  } catch (error) {
    console.error('Error searching employees:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching employees',
      error: error.message
    });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
  searchEmployees
};


