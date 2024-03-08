/* export interface HttpResponse {
  resCode: number;
  payload: any;
  resMsg: any;
} */

export interface HttpResponse {
  status: any;
}

export interface LoginResponse {
  token: string | null;
  role: string | null;
}
