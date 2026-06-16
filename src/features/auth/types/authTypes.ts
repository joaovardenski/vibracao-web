export interface LoginForm {
  email: string;
  password: string;
}

export type LoginErrors = Partial<Record<keyof LoginForm, string>>;
