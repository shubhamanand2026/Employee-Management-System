import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTable, FaTh, FaFilter, FaDownload } from 'react-icons/fa';
import { useEmployee } from '../context/EmployeeContext';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeCard from '../components/EmployeeCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import DeleteModal from '../components/DeleteModal';

const EmployeeList = () => {
  const {
    employees,
    loading,
    error,
    totalPages,
    currentPage,
    totalEmployees,
    loadEmployees,
    searchEmployees,
    deleteEmployee
  } = useEmployee();

  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState('');

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, []);

  // Handle search
  const handleSearch = (searchTerm) => {
    searchEmployees(searchTerm);
  };

  // Handle sort
  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
    // In a real app, you would send sort parameters to the API
    // For now, we'll just update the local state
  };

  // Handle page change
  const handlePageChange = (page) => {
    loadEmployees(page);
  };

  // Handle delete
  const handleDeleteClick = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (employeeToDelete) {
      try {
        await deleteEmployee(employeeToDelete);
        setShowDeleteModal(false);
        setEmployeeToDelete(null);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  // Handle edit
  const handleEdit = (employeeId) => {
    // Navigate to edit page
    window.location.href = `/employees/edit/${employeeId}`;
  };

  // Filter employees by department
  const filteredEmployees = filterDepartment
    ? employees.filter(emp => emp.department === filterDepartment)
    : employees;

  // Get unique departments for filter
  const departments = [...new Set(employees.map(emp => emp.department))];

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <button 
            className="btn btn-outline-danger" 
            onClick={() => loadEmployees()}
          >
            Try Again
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
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h1 className="h3 mb-1">Employee Management</h1>
              <p className="text-muted mb-0">
                Manage your team members efficiently
              </p>
            </div>
            <Link to="/employees/add" className="btn btn-primary">
              <FaPlus className="me-2" />
              Add Employee
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card stats-card">
            <div className="card-body text-center">
              <h3 className="stats-number text-primary">{totalEmployees}</h3>
              <p className="card-text text-muted mb-0">Total Employees</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card stats-card">
            <div className="card-body text-center">
              <h3 className="stats-number text-success">{departments.length}</h3>
              <p className="card-text text-muted mb-0">Departments</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card stats-card">
            <div className="card-body text-center">
              <h3 className="stats-number text-info">{currentPage}</h3>
              <p className="card-text text-muted mb-0">Current Page</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card stats-card">
            <div className="card-body text-center">
              <h3 className="stats-number text-warning">{totalPages}</h3>
              <p className="card-text text-muted mb-0">Total Pages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="col-md-3 mb-3">
          <select
            className="form-select"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <div className="btn-group w-100" role="group">
            <button
              type="button"
              className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewMode('table')}
            >
              <FaTable className="me-1" />
              Table
            </button>
            <button
              type="button"
              className={`btn ${viewMode === 'card' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewMode('card')}
            >
              <FaTh className="me-1" />
              Cards
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                Employees ({filteredEmployees.length})
              </h5>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary">
                  <FaDownload className="me-1" />
                  Export
                </button>
                <button className="btn btn-sm btn-outline-secondary">
                  <FaFilter className="me-1" />
                  Filter
                </button>
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading employees...</p>
                </div>
              ) : viewMode === 'table' ? (
                <EmployeeTable
                  employees={filteredEmployees}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              ) : (
                <div className="row">
                  {filteredEmployees.map(employee => (
                    <EmployeeCard
                      key={employee.id}
                      employee={employee}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="row mt-4">
          <div className="col-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalEmployees}
              itemsPerPage={10}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
      />
    </div>
  );
};

export default EmployeeList;


