import { getProfile, saveProfile } from "@/services/storage";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface UserProviderProps {
  children: ReactNode;
}
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const profile = await getProfile();
      setUser(profile);
    };

    loadUser();
  }, []);

  const setUserInfo = useCallback(async (user: User) => {
    setUser(user);
    await saveProfile(user);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      setUserInfo,
    }),
    [user, setUserInfo],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
