export interface FileModel {
  id: number;
  name: string;
  path: string;
  size: number;
  extension: string;
  status: number;
  updatedUser: number | null;
  updatedDate: Date | null;
  createdUser: number;
  createdDate: Date;
}
