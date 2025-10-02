-- Employee Management System Database Setup
-- Run this script to create the database and tables

-- Create database
CREATE DATABASE IF NOT EXISTS employee_management;
USE employee_management;

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2),
    hire_date DATE NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for better performance
    INDEX idx_email (email),
    INDEX idx_department (department),
    INDEX idx_position (position),
    INDEX idx_hire_date (hire_date),
    INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO employees (first_name, last_name, email, phone, position, department, salary, hire_date, address) VALUES
('John', 'Doe', 'john.doe@company.com', '+1-555-0123', 'Software Engineer', 'Engineering', 75000.00, '2023-01-15', '123 Main St, New York, NY 10001'),
('Jane', 'Smith', 'jane.smith@company.com', '+1-555-0124', 'Product Manager', 'Product', 85000.00, '2023-02-20', '456 Oak Ave, San Francisco, CA 94102'),
('Mike', 'Johnson', 'mike.johnson@company.com', '+1-555-0125', 'UX Designer', 'Design', 70000.00, '2023-03-10', '789 Pine St, Seattle, WA 98101'),
('Sarah', 'Wilson', 'sarah.wilson@company.com', '+1-555-0126', 'Marketing Specialist', 'Marketing', 65000.00, '2023-04-05', '321 Elm St, Austin, TX 78701'),
('David', 'Brown', 'david.brown@company.com', '+1-555-0127', 'Sales Manager', 'Sales', 80000.00, '2023-05-12', '654 Maple Dr, Chicago, IL 60601'),
('Lisa', 'Davis', 'lisa.davis@company.com', '+1-555-0128', 'HR Coordinator', 'Human Resources', 60000.00, '2023-06-18', '987 Cedar Ln, Boston, MA 02101'),
('Tom', 'Miller', 'tom.miller@company.com', '+1-555-0129', 'DevOps Engineer', 'Engineering', 90000.00, '2023-07-22', '147 Birch St, Denver, CO 80201'),
('Amy', 'Garcia', 'amy.garcia@company.com', '+1-555-0130', 'Financial Analyst', 'Finance', 72000.00, '2023-08-30', '258 Spruce Ave, Miami, FL 33101'),
('Chris', 'Martinez', 'chris.martinez@company.com', '+1-555-0131', 'Customer Success Manager', 'Customer Support', 68000.00, '2023-09-15', '369 Willow Way, Portland, OR 97201'),
('Emma', 'Anderson', 'emma.anderson@company.com', '+1-555-0132', 'Operations Manager', 'Operations', 78000.00, '2023-10-08', '741 Poplar St, Phoenix, AZ 85001');

-- Create a view for employee statistics
CREATE VIEW employee_stats AS
SELECT 
    COUNT(*) as total_employees,
    COUNT(DISTINCT department) as total_departments,
    AVG(salary) as average_salary,
    MIN(hire_date) as earliest_hire,
    MAX(hire_date) as latest_hire
FROM employees;

-- Create a view for department breakdown
CREATE VIEW department_breakdown AS
SELECT 
    department,
    COUNT(*) as employee_count,
    ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM employees)), 2) as percentage,
    AVG(salary) as avg_salary,
    MIN(salary) as min_salary,
    MAX(salary) as max_salary
FROM employees
GROUP BY department
ORDER BY employee_count DESC;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON employee_management.* TO 'your_username'@'localhost';
-- FLUSH PRIVILEGES;

-- Display setup completion message
SELECT 'Database setup completed successfully!' as message;
SELECT COUNT(*) as sample_records_inserted FROM employees;


