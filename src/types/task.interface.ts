import mongoose from "mongoose";



export interface ITaskDocuments {
   
  studentId:mongoose.ObjectId,
   title:string;
   description:string;
   dueDate:Date;
   status:'pending'|'completed'|'overdue'

}