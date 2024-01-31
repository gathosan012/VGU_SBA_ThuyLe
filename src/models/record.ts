import { FileModel } from "./file";
import { Staff, UserLogin } from "./user";

export interface Record {
    id: number;
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
    formNo: string
}