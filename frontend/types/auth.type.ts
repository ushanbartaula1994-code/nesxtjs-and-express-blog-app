

 export interface User {
  _id: string;
  username: string;
  email: string;
  fullname?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logOut: () => void;
  logIn: () => void;
  refreshUser: () => Promise<void>;
}