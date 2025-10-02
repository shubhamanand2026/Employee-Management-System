import React, { useState, useEffect } from 'react';
import { FaUsers, FaChartBar, FaDollarSign, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import { useEmployee } from '../context/EmployeeContext';
import employeeService from '../services/employeeService';

const EmployeeStats = () => {
  const { stats, loadStats } = useEmployee();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        await loadStats();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [loadStats]);

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading statistics...</p>
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
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3 mb-1">Employee Statistics</h1>
          <p className="text-muted mb-0">
            Overview of your organization's workforce
          </p>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card stats-card border-left-primary">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <FaUsers size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h3 className="stats-number text-primary mb-0">
                    {stats?.total || 0}
                  </h3>
                  <p className="card-text text-muted mb-0">Total Employees</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card stats-card border-left-success">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <FaBuilding size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h3 className="stats-number text-success mb-0">
                    {stats?.byDepartment?.length || 0}
                  </h3>
                  <p className="card-text text-muted mb-0">Departments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card stats-card border-left-info">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <FaDollarSign size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h3 className="stats-number text-info mb-0">
                    {formatCurrency(stats?.averageSalary)}
                  </h3>
                  <p className="card-text text-muted mb-0">Average Salary</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card stats-card border-left-warning">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <FaChartBar size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h3 className="stats-number text-warning mb-0">
                    {stats?.byDepartment?.reduce((acc, dept) => acc + dept.count, 0) || 0}
                  </h3>
                  <p className="card-text text-muted mb-0">Active Positions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <FaBuilding className="me-2" />
                Department Breakdown
              </h5>
            </div>
            <div className="card-body">
              {stats?.byDepartment && stats.byDepartment.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Employee Count</th>
                        <th>Percentage</th>
                        <th>Visual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.byDepartment.map((dept, index) => {
                        const percentage = ((dept.count / stats.total) * 100).toFixed(1);
                        return (
                          <tr key={index}>
                            <td>
                              <span className="badge bg-primary">{dept.department}</span>
                            </td>
                            <td>
                              <strong>{dept.count}</strong>
                            </td>
                            <td>
                              <span className="text-muted">{percentage}%</span>
                            </td>
                            <td>
                              <div className="progress" style={{ height: '8px' }}>
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${percentage}%` }}
                                  aria-valuenow={percentage}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No department data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <FaChartBar className="me-2" />
                Quick Stats
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Total Employees</span>
                  <span className="fw-bold">{stats?.total || 0}</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Departments</span>
                  <span className="fw-bold">{stats?.byDepartment?.length || 0}</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${((stats?.byDepartment?.length || 0) / 10) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Avg. Salary</span>
                  <span className="fw-bold">{formatCurrency(stats?.averageSalary)}</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div
                    className="progress-bar bg-info"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>

              <hr />

              <div className="text-center">
                <small className="text-muted">
                  Last updated: {new Date().toLocaleString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <FaCalendarAlt className="me-2" />
                Insights & Recommendations
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="text-primary">Workforce Distribution</h6>
                  <p className="text-muted">
                    Your organization has {stats?.total || 0} employees across {stats?.byDepartment?.length || 0} departments. 
                    {stats?.byDepartment && stats.byDepartment.length > 0 && (
                      <> The largest department is <strong>{stats.byDepartment[0].department}</strong> with {stats.byDepartment[0].count} employees.</>
                    )}
                  </p>
                </div>
                <div className="col-md-6">
                  <h6 className="text-success">Salary Analysis</h6>
                  <p className="text-muted">
                    The average salary across your organization is {formatCurrency(stats?.averageSalary)}. 
                    This provides a good benchmark for compensation planning and budget allocation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStats;


