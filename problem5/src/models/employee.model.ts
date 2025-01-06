import mongoose from 'mongoose';

export interface EmployeeDocument extends mongoose.Document {
    fullName: string;
    role: string;
    isDelete: boolean;
}

export enum Role {
    FullStack = 'FullStack',
    Frontend = 'Frontend',
    Backend = 'Backend'
}


const employeeSchema = new mongoose.Schema<EmployeeDocument>({
    fullName: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(Role) },
    isDelete: { type: Boolean, required: true, default: false }
});

const Employee = mongoose.model<EmployeeDocument>('Employee', employeeSchema);
export default Employee