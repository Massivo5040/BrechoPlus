// Faça esse arquivo no seu projeto do jeitinho qeu táo meu
// Só o que vai mudar vai ser o firebaseConfig, que vai estar lá no seu firebase
// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=pt-br#web
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  // Coloca a chave da sua API aqui
  // Para pegar a chave, entre nesse site https://firebase.google.com/?hl=pt-br
  // E clica em "go to console"
  // Lá você vai poder administrar o seu projeto e achar a sua chave, que vai tá na engrenagem
  apiKey: "sua key",
  authDomain: "brechoplus-47fa2.firebaseapp.com",
  projectId: "brechoplus-47fa2",
  storageBucket: "brechoplus-47fa2.firebasestorage.app",
  messagingSenderId: "714441616095",
  appId: "1:714441616095:web:751761b60d8f4c6a0a976a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth };
