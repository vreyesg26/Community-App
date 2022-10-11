import Head from "next/head";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [allPosts, setAllPosts] = useState([]);
  const route = useRouter();

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
  };

  useEffect(() => {
    getPosts();
  }, [checkUser()]);

  return (
    <div>
      <Head>
        <title>Feed | Community</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

      <div className="my-5 text-lg font-medium">
        <h2>See what other people are saying</h2>
        <hr className="my-3" />
        {allPosts.length == 0 ? (
          <div className="flex items-center gap-2">
            <h2 className="text-base my-3 text-gray-400">
              Nothing has been published yet
            </h2>
            <HiOutlineEmojiSad className="text-2xl text-gray-400" />
          </div>
        ) : (
          allPosts.map((post) => (
            <Message {...post} key={post.id}>
              <hr />
              <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
                <button className="bg-slate-100 hover:bg-slate-200 mt-5 mb-[-10px] rounded-md px-3 py-3 text-sm">
                  {post.comments?.length > 0 ? post.comments?.length : 0}{" "}
                  Comments
                </button>
              </Link>
            </Message>
          ))
        )}
      </div>
    </div>
  );
}