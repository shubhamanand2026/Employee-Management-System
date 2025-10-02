import React from 'react';
import { FaEdit, FaTrash, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import moment from 'moment';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
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

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 fade-in">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0 text-white">
            {employee.first_name} {employee.last_name}
          </h5>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-light dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Actions
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => onEdit(employee.id)}
                >
                  <FaEdit className="me-2" />
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => onDelete(employee.id)}
                >
                  <FaTrash className="me-2" />
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-12">
              <h6 className="text-primary mb-1">{employee.position}</h6>
              <span className="badge bg-secondary">{employee.department}</span>
            </div>
          </div>

          <div className="employee-details">
            <div className="detail-item mb-2">
              <FaEnvelope className="text-muted me-2" />
              <small className="text-muted">{employee.email}</small>
            </div>

            {employee.phone && (
              <div className="detail-item mb-2">
                <FaPhone className="text-muted me-2" />
                <small className="text-muted">{employee.phone}</small>
              </div>
            )}

            <div className="detail-item mb-2">
              <FaCalendarAlt className="text-muted me-2" />
              <small className="text-muted">
                Hired: {formatDate(employee.hire_date)}
              </small>
            </div>

            {employee.salary && (
              <div className="detail-item mb-2">
                <FaDollarSign className="text-muted me-2" />
                <small className="text-muted">{formatSalary(employee.salary)}</small>
              </div>
            )}

            {employee.address && (
              <div className="detail-item">
                <FaMapMarkerAlt className="text-muted me-2" />
                <small className="text-muted">{employee.address}</small>
              </div>
            )}
          </div>
        </div>

        <div className="card-footer bg-transparent">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              ID: #{employee.id}
            </small>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;


