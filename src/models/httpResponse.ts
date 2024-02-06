export interface HttpResponse {
  resCode: number;
  payload: any;
  resMsg: any;
}

// update
export interface LoginResponse {
  token: string;
  role: string;
}
