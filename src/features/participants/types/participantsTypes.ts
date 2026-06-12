export interface RegisterForm {
  cpf: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  parish: string;
  emergency_contact?: string;
}

export type FormErrors = Partial<Record<keyof RegisterForm, string>>;

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

export type PaymentStatus = "approved" | "pending" | "failure";

export interface PaymentDetails {
  participant: {
    name: string;
    email: string;
  };

  ticket: {
    lot: string;
    amount: number;
    ticket_number: string;
  };
}

export interface PaymentStatusResponse {
  status: string;
  participant: {
    name: string;
    email: string;
  };
  ticket: {
    lot: string;
    amount: number;
    ticket_number: string;
  };
}