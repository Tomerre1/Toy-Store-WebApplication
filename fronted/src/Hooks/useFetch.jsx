import { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy } from "@firebase/firestore";
import db from "../integrations/firebase";

export default function useFetch() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "actionsSite");
    const q = query(collectionRef, orderBy("isActive", "desc"));

    async function await_query(query) {
      try {
        const a = await getDocs(query)
        const b = a.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setActions(b)
      }
      catch (e) {
        console.log('%c  e:', 'color: white;background: red;', e);
      }
    }
    await_query(q)
  }, []);
  return actions;
}
