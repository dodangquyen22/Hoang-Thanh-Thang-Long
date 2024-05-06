import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlIig2UiyxJlAm1EYApRu6Kjr5s664Ozw",
  authDomain: "hoang-thanh-thang-long-4f942.firebaseapp.com",
  projectId: "hoang-thanh-thang-long-4f942",
  storageBucket: "hoang-thanh-thang-long-4f942.appspot.com",
  messagingSenderId: "955330957525",
  appId: "1:955330957525:web:94476a9ffd75d4e80c925c",
  measurementId: "G-EZNCTSCT5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//IOS: 15785712342-k9bgo9hridhm3snak23achi1qgpnsdpm.apps.googleusercontent.com
//Android: 15785712342-b6487ks6dhhjfge93cuvdp985f36meh5.apps.googleusercontent.com
