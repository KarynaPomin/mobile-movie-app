interface User {
  full_name: string;
  avatar: string | null;
  birth_date: Date | null;
  location: string | null;
}

interface UserContextType {
  user: User | null;
  setUserInfo: (user: User) => void;
}
