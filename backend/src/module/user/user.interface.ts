export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  zip?: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  reviews?: [];
}
