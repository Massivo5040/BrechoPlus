import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
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
