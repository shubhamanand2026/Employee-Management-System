import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useEmployee } from '../context/EmployeeContext';
import EmployeeForm from '../components/EmployeeForm';

const AddEmployee = () => {
  const navigate = useNavigate();
  const { addEmployee, loading } = useEmployee();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (employeeData) => {
    try {
      setIsSubmitting(true);
      await addEmployee(employeeData);
      navigate('/employees');
    } catch (error) {
      console.error('Error adding employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center mb-3">
            <button
              className="btn btn-outline-secondary me-3"
              onClick={() => navigate('/employees')}
            >
              <FaArrowLeft className="me-2" />
              Back to Employees
            </button>
            <div>
              <h1 className="h3 mb-1">Add New Employee</h1>
              <p className="text-muted mb-0">
                Fill in the details to add a new team member
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Employee Information</h5>
            </div>
            <div className="card-body">
              <EmployeeForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="row justify-content-center mt-4">
        <div className="col-lg-8">
          <div className="alert alert-info">
            <h6 className="alert-heading">💡 Tips for adding employees:</h6>
            <ul className="mb-0">
              <li>All fields marked with <span className="text-danger">*</span> are required</li>
              <li>Email addresses must be unique across all employees</li>
              <li>Phone numbers should include country code if international</li>
              <li>Salary is optional but recommended for payroll purposes</li>
              <li>Hire date cannot be in the future</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;


