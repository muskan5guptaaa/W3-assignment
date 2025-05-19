import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6gI-TCW9YCgfR4Z3FoMOi6wM7jkau2Lk",
  authDomain: "netflix-gpt-7802e.firebaseapp.com",
  projectId: "netflix-gpt-7802e",
  appId: "1:1017613804133:web:a772837b375ee83f5f9c8c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
