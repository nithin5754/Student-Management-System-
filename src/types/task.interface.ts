import mongoose, { ObjectId } from "mongoose";



export interface ITaskDocuments {
   _id?:ObjectId
  studentId:mongoose.ObjectId,
   title:string;
   description:string;
   dueDate:Date;
   status:'pending'|'completed'|'overdue'

}


export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  OVERDUE='overdue'
}