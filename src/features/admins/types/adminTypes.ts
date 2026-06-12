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

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
}
