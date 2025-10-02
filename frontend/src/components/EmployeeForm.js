import React from 'react';
import { useForm } from 'react-hook-form';
import { FaSave, FaTimes } from 'react-icons/fa';

const EmployeeForm = ({ 
  employee = null, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: employee || {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      salary: '',
      hire_date: '',
      address: ''
    }
  });

  const handleFormSubmit = (data) => {
    // Convert salary to number if provided
    if (data.salary) {
      data.salary = parseFloat(data.salary);
    }
    
    // Convert hire_date to ISO string
    if (data.hire_date) {
      data.hire_date = new Date(data.hire_date).toISOString().split('T')[0];
    }

    onSubmit(data);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="needs-validation" noValidate>
      <div className="row">
        {/* Personal Information */}
        <div className="col-12">
          <h5 className="text-primary mb-3">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h5>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
            id="first_name"
            {...register('first_name', {
              required: 'First name is required',
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters'
              },
              maxLength: {
                value: 50,
                message: 'First name must not exceed 50 characters'
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'First name can only contain letters and spaces'
              }
            })}
          />
          {errors.first_name && (
            <div className="invalid-feedback">
              {errors.first_name.message}
            </div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
            id="last_name"
            {...register('last_name', {
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters'
              },
              maxLength: {
                value: 50,
                message: 'Last name must not exceed 50 characters'
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Last name can only contain letters and spaces'
              }
            })}
          />
          {errors.last_name && (
            <div className="invalid-feedback">
              {errors.last_name.message}
            </div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="email" className="form-label">
            Email Address <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            placeholder="+1 (555) 123-4567"
            {...register('phone', {
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: 'Please enter a valid phone number'
              }
            })}
          />
          {errors.phone && (
            <div className="invalid-feedback">
              {errors.phone.message}
            </div>
          )}
        </div>

        {/* Work Information */}
        <div className="col-12">
          <hr className="my-4" />
          <h6 className="text-secondary mb-3">Work Information</h6>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="position" className="form-label">
            Position <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.position ? 'is-invalid' : ''}`}
            id="position"
            placeholder="e.g., Software Engineer"
            {...register('position', {
              required: 'Position is required',
              minLength: {
                value: 2,
                message: 'Position must be at least 2 characters'
              },
              maxLength: {
                value: 100,
                message: 'Position must not exceed 100 characters'
              }
            })}
          />
          {errors.position && (
            <div className="invalid-feedback">
              {errors.position.message}
            </div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="department" className="form-label">
            Department <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select ${errors.department ? 'is-invalid' : ''}`}
            id="department"
            {...register('department', {
              required: 'Department is required'
            })}
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Customer Support">Customer Support</option>
            <option value="Design">Design</option>
            <option value="Product">Product</option>
            <option value="Other">Other</option>
          </select>
          {errors.department && (
            <div className="invalid-feedback">
              {errors.department.message}
            </div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
              id="salary"
              placeholder="50000"
              min="0"
              step="0.01"
              {...register('salary', {
                min: {
                  value: 0,
                  message: 'Salary must be a positive number'
                }
              })}
            />
          </div>
          {errors.salary && (
            <div className="invalid-feedback">
              {errors.salary.message}
            </div>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="hire_date" className="form-label">
            Hire Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className={`form-control ${errors.hire_date ? 'is-invalid' : ''}`}
            id="hire_date"
            {...register('hire_date', {
              required: 'Hire date is required',
              validate: {
                notFuture: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  return selectedDate <= today || 'Hire date cannot be in the future';
                }
              }
            })}
          />
          {errors.hire_date && (
            <div className="invalid-feedback">
              {errors.hire_date.message}
            </div>
          )}
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            id="address"
            rows="3"
            placeholder="Enter full address"
            {...register('address', {
              maxLength: {
                value: 500,
                message: 'Address must not exceed 500 characters'
              }
            })}
          />
          {errors.address && (
            <div className="invalid-feedback">
              {errors.address.message}
            </div>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
          disabled={isLoading}
        >
          <FaTimes className="me-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {employee ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <FaSave className="me-2" />
              {employee ? 'Update Employee' : 'Create Employee'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;


