const { pool } = require('../config/database');

class Employee {
  constructor(data) {
    this.id = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.phone = data.phone;
    this.position = data.position;
    this.department = data.department;
    this.salary = data.salary;
    this.hire_date = data.hire_date;
    this.address = data.address;
  }

  // Get all employees
  static async getAll() {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM employees ORDER BY created_at DESC'
      );
      return rows.map(row => new Employee(row));
    } catch (error) {
      throw new Error(`Error fetching employees: ${error.message}`);
    }
  }

  // Get employee by ID
  static async getById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM employees WHERE id = ?',
        [id]
      );
      if (rows.length === 0) {
        return null;
      }
      return new Employee(rows[0]);
    } catch (error) {
      throw new Error(`Error fetching employee: ${error.message}`);
    }
  }

  // Create new employee
  static async create(employeeData) {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        position,
        department,
        salary,
        hire_date,
        address
      } = employeeData;

      const [result] = await pool.execute(
        `INSERT INTO employees 
         (first_name, last_name, email, phone, position, department, salary, hire_date, address) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, phone, position, department, salary, hire_date, address]
      );

      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw new Error(`Error creating employee: ${error.message}`);
    }
  }

  // Update employee
  static async update(id, employeeData) {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        position,
        department,
        salary,
        hire_date,
        address
      } = employeeData;

      const [result] = await pool.execute(
        `UPDATE employees SET 
         first_name = ?, last_name = ?, email = ?, phone = ?, 
         position = ?, department = ?, salary = ?, hire_date = ?, address = ?
         WHERE id = ?`,
        [first_name, last_name, email, phone, position, department, salary, hire_date, address, id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw new Error(`Error updating employee: ${error.message}`);
    }
  }

  // Delete employee
  static async delete(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM employees WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting employee: ${error.message}`);
    }
  }

  // Search employees
  static async search(searchTerm) {
    try {
      const [rows] = await pool.execute(
        `SELECT * FROM employees 
         WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? 
         OR position LIKE ? OR department LIKE ?
         ORDER BY created_at DESC`,
        [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
      );
      return rows.map(row => new Employee(row));
    } catch (error) {
      throw new Error(`Error searching employees: ${error.message}`);
    }
  }

  // Get employees by department
  static async getByDepartment(department) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM employees WHERE department = ? ORDER BY created_at DESC',
        [department]
      );
      return rows.map(row => new Employee(row));
    } catch (error) {
      throw new Error(`Error fetching employees by department: ${error.message}`);
    }
  }

  // Get employee statistics
  static async getStats() {
    try {
      const [totalRows] = await pool.execute('SELECT COUNT(*) as total FROM employees');
      const [deptRows] = await pool.execute(
        'SELECT department, COUNT(*) as count FROM employees GROUP BY department'
      );
      const [avgSalaryRows] = await pool.execute(
        'SELECT AVG(salary) as avg_salary FROM employees WHERE salary IS NOT NULL'
      );

      return {
        total: totalRows[0].total,
        byDepartment: deptRows,
        averageSalary: avgSalaryRows[0].avg_salary || 0
      };
    } catch (error) {
      throw new Error(`Error fetching statistics: ${error.message}`);
    }
  }
}

module.exports = Employee;


