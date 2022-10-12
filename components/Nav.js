import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaRocket } from "react-icons/fa";

export default function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-10 px-3 z-10 -mx-5  index sticky top-0 bg-white">
      <div className="flex gap-2">
        <Link href={`${user ? '/feed' : '/'} `}>
          <div className="flex gap-2">
            <img className="w-12 cursor-pointer" src="/logo.png" alt="logo" />
            <button className="text-base font-medium">Community</button>
          </div>
        </Link>
      </div>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/"}>
            <div className="flex items-center justify-center">
              <FaRocket className="text-gray-500 text-lg" />
              <a className="py-2 px-3 text-gray-500 text-lg rounded-lg font-medium ">
                Welcome
              </a>
            </div>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-4">
            <Link href="/post">
              <button className="font-medium bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-3 rounded-md text-sm">
                New Post
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer hover:opacity-70"
                src={user.photoURL}
                alt="Photo"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
