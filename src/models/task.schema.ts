

import mongoose, { Model } from "mongoose";
import { ITaskDocuments } from "../types/task.interface";



const taskSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'overdue'], 
      default: 'pending' 
    }
  },
  { timestamps: true }
);




export const TaskModal: Model<ITaskDocuments> = mongoose.model<ITaskDocuments>(
  "Task",
  taskSchema
);
