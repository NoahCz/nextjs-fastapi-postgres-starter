import { IUser } from "@/app/types/user";

export interface UserContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  setUser: (user: IUser | null) => void;
}
