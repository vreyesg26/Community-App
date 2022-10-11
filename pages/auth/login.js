import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import Head from "next/head";

export default function Login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  //Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="shadow-2xl -mt-12 p-10 text-gray-700 rounded-lg">
      <Head>
        <title>Sign In | Community</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>
      <h2 className="text-2xl font-semibold">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Welcome to Community Family</h3>
        <button
          className="text-white bg-gray-500 w-full font-medium rounded-lg flex align-middle p-4 hover:bg-gray-600 gap-2"
          onClick={googleLogin}
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
