import { useState, createContext, useContext, useEffect } from "react";
import { getLocation } from "./services/getLocation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { getDocumentData } from "./firebase";


// Context created here
const Context = createContext({});

// Context provider created below
export const ContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const [posLong, setPosLong] = useState("");
  const [posLat, setPosLat] = useState("");
  const [isEmailAccess, setEmailAccess] = useState(false)

  const getLatLong = () => {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        setPosLat(res.coords.latitude);
        setPosLong(res.coords.longitude);

        getLocation(res.coords.latitude, res.coords.longitude);
      },
      (err) => console.log(err)
    );
  };

  async function getUserData(id, user) {
    let res = await getDocumentData('users', id)
    setEmailAccess(res)
    localStorage.setItem("userData", JSON.stringify({ ...user, isEmailAccess: res }));
  }

  useEffect(() => {
    getLatLong();

    onAuthStateChanged(auth, (user) => {

      if (user) {
        getUserData(user.uid, user)
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem('userIdd', user.uid)
        setUserData(user);
        setUserAuth(true);
        // console.log(user,'yessssssssssssssssssssssssssssss')
      }
      else {
        // console.log(user,'kokokokokokokokookokokokookokookoooo')
      }
    });
  }, []);

  return (
    <Context.Provider value={{ userAuth, userData, posLat, posLong, isEmailAccess, setEmailAccess }}>
      {children}
    </Context.Provider>
  );
};

// Custom hook to read context data
export const ReadContext = () => {
  const { userAuth } = useContext(Context);
  const { userData } = useContext(Context);
  const { posLong } = useContext(Context);
  const { posLat } = useContext(Context);
  const { isEmailAccess } = useContext(Context)
  const { setEmailAccess } = useContext(Context)

  const value = {
    userAuth,
    userData,
    posLong,
    posLat,
    isEmailAccess,
    setEmailAccess
  };

  return value;
};
