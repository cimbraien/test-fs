export interface CreateUserDto {
  email: string;
  password: string;
  name: string | null;
}

export interface LoginDto {
  email: string;
  password: string;
}
