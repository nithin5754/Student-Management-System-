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
  comparePassword(userPassword:string):Promise<boolean>
  getJWT():Promise<string>
  createdAt?: string;
  updatedAt?: string;


}


  