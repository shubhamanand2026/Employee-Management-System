import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import { useEmployee } from '../context/EmployeeContext';
import EmployeeForm from '../components/EmployeeForm';
import employeeService from '../services/employeeService';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateEmployee, loading } = useEmployee();
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setIsLoading(true);
        const response = await employeeService.getEmployeeById(id);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const handleSubmit = async (employeeData) => {
    try {
      setIsSubmitting(true);
      await updateEmployee(id, employeeData);
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  if (isLoading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <button 
            className="btn btn-outline-danger" 
            onClick={() => navigate('/employees')}
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Employee Not Found</h4>
          <p>The employee you're looking for doesn't exist or has been deleted.</p>
          <button 
            className="btn btn-outline-warning" 
            onClick={() => navigate('/employees')}
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

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
            <div className="d-flex align-items-center">
              <div className="avatar-circle me-3">
                <FaUser />
              </div>
              <div>
                <h1 className="h3 mb-1">Edit Employee</h1>
                <p className="text-muted mb-0">
                  Update information for {employee.first_name} {employee.last_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                Employee Information - {employee.first_name} {employee.last_name}
              </h5>
            </div>
            <div className="card-body">
              <EmployeeForm
                employee={employee}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Employee Details Summary */}
      <div className="row justify-content-center mt-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">Current Information</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Employee ID:</strong> #{employee.id}</p>
                  <p><strong>Email:</strong> {employee.email}</p>
                  <p><strong>Position:</strong> {employee.position}</p>
                  <p><strong>Department:</strong> {employee.department}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Phone:</strong> {employee.phone || 'Not provided'}</p>
                  <p><strong>Salary:</strong> {employee.salary ? `$${employee.salary.toLocaleString()}` : 'Not specified'}</p>
                  <p><strong>Hire Date:</strong> {new Date(employee.hire_date).toLocaleDateString()}</p>
                  <p><strong>Address:</strong> {employee.address || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;


