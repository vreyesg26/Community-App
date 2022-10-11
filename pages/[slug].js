import Message from "../components/Message";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { HiPaperAirplane } from 'react-icons/hi';
import { arrayUnion, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  //Submit a message
  const submitMessage = async () => {
    //Check if the user is logged
    if(!auth.currentUser) return router.push('/auth/login');
    if(!message) {
        toast.error("Don't leave an empty message");
        return;
    }

    const docRef = doc(db, 'posts', routeData.id);
    await updateDoc(docRef, {
        comments: arrayUnion({
            message,
            avatar: auth.currentUser.photoURL,
            userName: auth.currentUser.displayName,
            time: Timestamp.now(),
        })     
    })

    setMessage("");
  };

  //Get comments
  const getComments = async () => {
    const docRef = doc(db, 'posts', routeData.id);
    const docSnap = await getDoc(docRef);
    setAllMessages(docSnap.data().comments);
  }

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady, submitMessage])
  

  return (
    <div>
      <Message {...routeData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Comment this post"
            className="bg-white drop-shadow-2xl outline-none w-full px-8 p-2 text-sm mr-[-30px] rounded-lg"
          />
          <button onClick={submitMessage} className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-3 text-2xl rounded-full z-10 rotate-90"><HiPaperAirplane /></button>
        </div>
        <div className="py-6">
            <h2 className="font-semibold">Comments</h2>
            {allMessages?.map(message => (
                <div className="bg-gray-400 p-4 my-4 bg-opacity-50 rounded-lg" key={message.time}>
                    <div className="flex items-center gap-2 mb-4">
                        <img className="w-12 rounded-full" src={message.avatar} alt="Photo" />
                        <h2 className="text-sm">{message.userName}</h2>
                    </div>
                    <h2 className="text-sm">{message.message}</h2>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
