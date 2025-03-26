export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student'
}

export interface UserDocuments {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?:string;
  comparePassword(userPassword:string):Promise<boolean>;
  getJWT(id:string,role:UserRole):Promise<any>
  createdAt?: string;
  updatedAt?: string;


}


  