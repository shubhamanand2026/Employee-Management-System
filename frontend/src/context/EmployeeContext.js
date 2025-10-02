import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';
import employeeService from '../services/employeeService';

// Initial state
const initialState = {
  employees: [],
  loading: false,
  error: null,
  stats: null,
  searchTerm: '',
  currentPage: 1,
  totalPages: 1,
  totalEmployees: 0
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_EMPLOYEES: 'SET_EMPLOYEES',
  SET_ERROR: 'SET_ERROR',
  ADD_EMPLOYEE: 'ADD_EMPLOYEE',
  UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE: 'DELETE_EMPLOYEE',
  SET_STATS: 'SET_STATS',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_PAGINATION: 'SET_PAGINATION',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
const employeeReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null
      };

    case ActionTypes.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload.employees,
        currentPage: action.payload.pagination?.currentPage || 1,
        totalPages: action.payload.pagination?.totalPages || 1,
        totalEmployees: action.payload.pagination?.totalEmployees || 0,
        loading: false,
        error: null
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ActionTypes.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [action.payload, ...state.employees],
        totalEmployees: state.totalEmployees + 1
      };

    case ActionTypes.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map(emp =>
          emp.id === action.payload.id ? action.payload : emp
        )
      };

    case ActionTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload),
        totalEmployees: state.totalEmployees - 1
      };

    case ActionTypes.SET_STATS:
      return {
        ...state,
        stats: action.payload
      };

    case ActionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };

    case ActionTypes.SET_PAGINATION:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        totalEmployees: action.payload.totalEmployees
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Create context
const EmployeeContext = createContext();

// Provider component
export const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  // Load employees
  const loadEmployees = async (page = 1, searchTerm = '') => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await employeeService.getEmployees(page, searchTerm);
      
      dispatch({
        type: ActionTypes.SET_EMPLOYEES,
        payload: {
          employees: response.data,
          pagination: response.pagination
        }
      });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      toast.error('Failed to load employees');
    }
  };

  // Load employee stats
  const loadStats = async () => {
    try {
      const response = await employeeService.getStats();
      dispatch({ type: ActionTypes.SET_STATS, payload: response.data });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  // Add employee
  const addEmployee = async (employeeData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await employeeService.createEmployee(employeeData);
      
      dispatch({ type: ActionTypes.ADD_EMPLOYEE, payload: response.data });
      toast.success('Employee added successfully');
      return response.data;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      toast.error(error.message || 'Failed to add employee');
      throw error;
    }
  };

  // Update employee
  const updateEmployee = async (id, employeeData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await employeeService.updateEmployee(id, employeeData);
      
      dispatch({ type: ActionTypes.UPDATE_EMPLOYEE, payload: response.data });
      toast.success('Employee updated successfully');
      return response.data;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      toast.error(error.message || 'Failed to update employee');
      throw error;
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      await employeeService.deleteEmployee(id);
      
      dispatch({ type: ActionTypes.DELETE_EMPLOYEE, payload: id });
      toast.success('Employee deleted successfully');
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      toast.error(error.message || 'Failed to delete employee');
      throw error;
    }
  };

  // Search employees
  const searchEmployees = async (searchTerm) => {
    try {
      dispatch({ type: ActionTypes.SET_SEARCH_TERM, payload: searchTerm });
      await loadEmployees(1, searchTerm);
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      toast.error('Failed to search employees');
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
    loadStats();
  }, []);

  const value = {
    ...state,
    loadEmployees,
    loadStats,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
    clearError
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to use employee context
export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};

export default EmployeeContext;


