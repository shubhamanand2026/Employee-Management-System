import React from 'react';
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import moment from 'moment';

const EmployeeTable = ({ 
  employees, 
  onEdit, 
  onDelete, 
  sortField, 
  sortDirection, 
  onSort 
}) => {
  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(salary);
  };

  const formatDate = (date) => {
    return moment(date).format('MMM DD, YYYY');
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <FaSort className="text-muted" />;
    }
    return sortDirection === 'asc' ? 
      <FaSortUp className="text-primary" /> : 
      <FaSortDown className="text-primary" />;
  };

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, direction);
  };

  if (employees.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="text-muted">
          <h5>No employees found</h5>
          <p>Start by adding your first employee!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th 
              className="sortable" 
              onClick={() => handleSort('first_name')}
              style={{ cursor: 'pointer' }}
            >
              Name {getSortIcon('first_name')}
            </th>
            <th 
              className="sortable" 
              onClick={() => handleSort('email')}
              style={{ cursor: 'pointer' }}
            >
              Email {getSortIcon('email')}
            </th>
            <th 
              className="sortable" 
              onClick={() => handleSort('position')}
              style={{ cursor: 'pointer' }}
            >
              Position {getSortIcon('position')}
            </th>
            <th 
              className="sortable" 
              onClick={() => handleSort('department')}
              style={{ cursor: 'pointer' }}
            >
              Department {getSortIcon('department')}
            </th>
            <th 
              className="sortable" 
              onClick={() => handleSort('salary')}
              style={{ cursor: 'pointer' }}
            >
              Salary {getSortIcon('salary')}
            </th>
            <th 
              className="sortable" 
              onClick={() => handleSort('hire_date')}
              style={{ cursor: 'pointer' }}
            >
              Hire Date {getSortIcon('hire_date')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="avatar-circle me-3">
                    {employee.first_name.charAt(0).toUpperCase()}
                    {employee.last_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="fw-bold">
                      {employee.first_name} {employee.last_name}
                    </div>
                    <small className="text-muted">ID: #{employee.id}</small>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="me-2">📧</span>
                  {employee.email}
                </div>
                {employee.phone && (
                  <small className="text-muted d-block">
                    📞 {employee.phone}
                  </small>
                )}
              </td>
              <td>
                <span className="badge bg-primary">{employee.position}</span>
              </td>
              <td>
                <span className="badge bg-secondary">{employee.department}</span>
              </td>
              <td>
                <span className="fw-bold text-success">
                  {formatSalary(employee.salary)}
                </span>
              </td>
              <td>
                <span className="text-muted">
                  {formatDate(employee.hire_date)}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEdit(employee.id)}
                    title="Edit Employee"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(employee.id)}
                    title="Delete Employee"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;


