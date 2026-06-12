export interface RegisterForm {
  cpf: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  parish: string;
  emergency_contact?: string;
}

export interface RegistrationResponse {
  participant: {
    id: string;
    full_name: string;
    email: string;
  };
  order: {
    id: string;
    status: string;
    amount: string;
    expires_at: string;
  };
  payment: {
    id: string;
    status: string;
  };
  preference: {
    id: string;
    sandbox_init_point: string;
    init_point: string;
  };
}

export interface LoginForm {
  email: string;
  password: string;
}

export type FormErrors = Partial<Record<keyof RegisterForm, string>>;
export type LoginErrors = Partial<Record<keyof LoginForm, string>>;

export interface ManualRegistrationForm {
  full_name: string;
  cpf: string;
  email: string;
  phone: string;
  city: string;
  parish: string;
  emergency_contact: string;
}

export interface ManualRegistrationErrors {
  full_name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  city?: string;
  parish?: string;
  emergency_contact?: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface Registration {
  id: string;
  ticket_number: string;
  status: "approved" | "pending" | "expired" | "cancelled";
  amount: number;
  approved_at: string | null;
  created_at: string;

  participant: {
    id: string;
    full_name: string;
    cpf: string;
    email: string;
    phone: string;
    city: string;
    parish: string;
    emergency_contact?: string;
  };

  ticket_lot: {
    id: string;
    name: string;
    price: number;
  };
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
}
