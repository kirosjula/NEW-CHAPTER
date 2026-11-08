import { useEffect, useState } from "react";
import {
  collection, addDoc, onSnapshot, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(()=>{
    const q = query(collection(db,"wishes"), orderBy("createdAt", "asc"));
    return onSnapshot(q,(snap)=>
    setWishes(
      snap.docs
      .map((d)=>({id:d.id,...d.data()}))
      .filter((w)=>w.name && w.message)
    )
    );
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    try {
      await addDoc(collection(db, "wishes"), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setName("");
      setMessage("");
      setStatus("Thank you! Your wish was added 💛");
    } catch {
      setStatus("Sorry, something went wrong. Please try again.");
    }
  }

  return (
    <div className="wishes">
      <h3 className="wishes-title">Write a welcome message for the baby boy❤️</h3>
      <form onSubmit={submit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={40}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your birthday wish for the baby boy…"
          maxLength={600}
          rows={4}
        />
        <button type="submit">Send my wish 💛</button>
        {status && <p>{status}</p>}
      </form>

      {wishes.length > 0 && (
        <p className="wish-count">💛 {wishes.length} wishes so far</p>
      )}

      {wishes.map((w) => (
        <div key={w.id} className="wish">
          <div className="wish-avatar">{w.name.charAt(0).toUpperCase()}</div>
          <div>
            <p>“{w.message}”</p>
            <strong>— {w.name}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}