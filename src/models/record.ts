import type { FileModel } from "./file";
import type { Staff, UserLogin } from "./AdminArea/user/user";

export interface Record {
  id: number;
  role: string; // update
  code: string;
  description: string;
  uploadFile: File;
  status: number;
  createdDate: Date | null;
  createdUser: UserLogin | number;
  updateDate: Date | null;
  updateUser: UserLogin | number;
  staff: Staff;
  file: FileModel;
  whMonthStart: Date;
  whMonthEnd: Date;
  publishedDate: Date;
  seqNo: number;
  serialNo: string;
  formNo: string;
}