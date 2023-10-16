import axios from "axios";
import router from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useHomeDataContext } from "./HomeDataProvider";

type UserSession = {
  token: string;
};

type AuthCxt = {
  session?: UserSession;
  setSession: (session: UserSession) => void;
  params?: URLSearchParams
};

const AuthContext = createContext<AuthCxt>({ setSession: () => {} });
export const useAuthContext = () => useContext(AuthContext);



const REFRESH_TOKEN_INTERVAL = 1000 * 20;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<UserSession>(() => getUserSession());
  
  

  useEffect(() => saveUserSession(session), [session]);

  

  const params = new URLSearchParams();
    params.append('grant_type', 'token');
    params.append('scope', 'catalog');
    params.append('client_id', 'plataform-catalog');
    params.append('client_secret', '3f366146-b73c-48aa-9e5b-38de80f10bc0');
    params.append('environment', 'hml');
    params.append('campaign', 'venca');
    params.append('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmNpYS5wZXJlaXJhQGRpZ2kuYWciLCJzdWIiOiJjYmRkYjU3Zi0yZjcxLTRlYjUtOGQwOS04OGJkNWNjNGY2NjkiLCJpYXQiOjE2NTQ3ODExMDAsImV4cCI6MTY4NjMxNzEwMH0.TA4sTKX_eXpFgIzixVcjfvyUOH9uDzm2X5qxjuVmY2g');

  // const renewToken = useCallback(() => {
  //   //Logica de renovação de token
  //    axios
  //      .post(`http://20.226.77.29/authapi/connect/token`, params)
  //      .then((res) => {
  //        setSession({token: res.data.access_token});
  //      })
       
  //      .catch();
  // }, []);
  // useEffect(() => {
  //   const timeInterval = setInterval(renewToken, REFRESH_TOKEN_INTERVAL);
  //   return () => clearInterval(timeInterval);
  // }, []);
  
  // useEffect(() => {
  //   if (session?.token === undefined) {
  //     // toast.success('Token expirado, por favor refaça o login para continuar', {
  //     //   position: "top-right",
  //     //   autoClose: 5000,
  //     //   hideProgressBar: false,
  //     //   closeOnClick: true,
  //     //   pauseOnHover: true,
  //     //   draggable: true,
  //     //   progress: undefined,
  //     // });
      
  //     router.push({
  //       pathname: "/page-login",
  //       // pathname: "https://www.reconhece.vc/"
  //   });
  //   }
  // },[]);

  return (
    <AuthContext.Provider value={{ session, setSession, params }}>
      {children}
    </AuthContext.Provider>
  );
};

const getUserSession = (): UserSession | undefined => {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem("UserSession");
    if (!stored) return undefined;
    return JSON.parse(stored);
  }
};

const saveUserSession = (state?: UserSession) => {
  if (typeof window !== "undefined") {
    if (state) {
      window.localStorage.setItem("UserSession", JSON.stringify(state));
    } else {
      window.localStorage.removeItem("UserSession");
    }
  }
};
