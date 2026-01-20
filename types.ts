
export type UserRole = 'client' | 'business' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  category: string;
  description: string;
  address: string; // Novo campo para localização física
  price: string;
  image: string;
  rating: number;
  location: string; // Estado/Cidade
  availableSlots: string[]; // ISO strings
}

export interface Appointment {
  id: string;
  businessId: string;
  clientId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  serviceName: string;
}

export interface AppState {
  user: User | null;
  businesses: Business[];
  appointments: Appointment[];
}
