import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface UserPayload {
  id: number;
  username: string;
  followedTeams: string[];
  folllowedCompetitions: string[];
}

type AuthContextType = {
  user: UserPayload | null;
  setUser: Dispatch<SetStateAction<UserPayload | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<UserPayload | null>(null);
  return <AuthContext.Provider {...props} value={{ user, setUser }} />;
};

export { AuthProvider, AuthContext, AuthContextType, UserPayload };
