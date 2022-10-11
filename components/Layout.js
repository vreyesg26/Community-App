import Nav from "./Nav";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";


export default function Layout({ children }) {
  const [user, loading] = useAuthState(auth);
  

  return (
    <div className="mx-6 md:max-w-2xl md:mx-auto font-poppins items-center">
      <Nav />
      <div className={`${user ? 'hidden' : ''} flex justify-center`}>
        <img
          className="w-52 md:w-44 z-20"
          src="/background.png"
          alt=""
        />
      </div>
      <main>{children}</main>
    </div>
  );
}
