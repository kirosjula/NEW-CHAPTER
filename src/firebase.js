import{initializeApp} from "firebase/app";
import{getFirestore}from "firebase/firestore";

//PASTE the const firebaseConfig={...}; block here
const firebaseConfig = {
  apiKey: "AIzaSyCDUkH9E0tPv3BWP91IZjpubtV0iWF5b5c",
  authDomain: "new-chapter-c505b.firebaseapp.com",
  projectId: "new-chapter-c505b",
  storageBucket: "new-chapter-c505b.firebasestorage.app",
  messagingSenderId: "206886842621",
  appId: "1:206886842621:web:93e3e38cf16e5fe6450e94"
};

const app=initializeApp(firebaseConfig);
export const db=getFirestore(app);