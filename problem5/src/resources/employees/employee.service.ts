import Employee, { EmployeeDocument, Role } from '../../models/employee.model';

export interface EmployeeFilter {
    fullName?: string;
    role?: Role;
    isDelete?: boolean;
}

export const getEmployees = async (filter: EmployeeFilter): Promise<EmployeeDocument[]> => {
    if (!filter.isDelete) {
        filter.isDelete = false
    }
    try {
        const employees = await Employee.find(filter);
        return employees;
    } catch (error) {
        throw new Error('Fail to fetch employees')
    }
};

export const getEmployeeById = async (id: string): Promise<EmployeeDocument | null> => {
    console.log('employeeid', id)
    const employee = await Employee.findById(id);
    return employee;
};

export const createEmployee = async (createEmployeeDto: Omit<EmployeeDocument, '_id' | 'isDeleted'>): Promise<EmployeeDocument> => {
    const employee = await Employee.create(createEmployeeDto)
    return employee;
};

export const updateEmployee = async (id: string, employeeData: Omit<EmployeeDocument, '_id' | 'isDeleted'>): Promise<EmployeeDocument | null> => {
    try {
        const employee = await Employee.findById(id);

        if (!employee) {
            return null
        }
        const updatedEmployee = await Employee.findByIdAndUpdate(id, employeeData, {
            new: true,
        });
        return updatedEmployee;
    } catch (error) {
        throw new Error('Error updating employee');
    }
};

export const deleteEmployee = async (id: string): Promise<boolean | null> => {
    try {
        const employee = await Employee.findById(id);

        if (!employee) {
            return null;
        }
        await Employee.findByIdAndUpdate(id, { isDelete: true });
        return true;
    } catch (error) {
        throw new Error('Error delete employee');
    }
};