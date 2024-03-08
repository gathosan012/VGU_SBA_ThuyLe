export interface HttpResponse {
  status: any;
}

export interface LoginResponse {
  token: string | null;
  role: string | null;
}
