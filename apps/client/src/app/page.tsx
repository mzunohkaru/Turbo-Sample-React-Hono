"use client";

import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useUser } from "@/hook/useUser";
import { usePost } from "@/hook/usePost";

export default function Home() {
  const { userData, fetchUser, isMutating, error, createUserData, createUser } =
    useUser();
  const handleFetchUser = () => {
    fetchUser();
    console.log("userData", userData);
  };

  const handleCreateUser = () => {
    createUser();
    console.log("createUserData", createUserData);
  };

  const { postData } = usePost();
  console.log("postData", postData);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <button onClick={() => handleFetchUser()}>Fetch User</button>
        <button onClick={() => handleCreateUser()}>Create User</button>
        <div>
          <p>userData: {JSON.stringify(userData)}</p>
          <p>isMutating: {JSON.stringify(isMutating)}</p>
          <p>error: {JSON.stringify(error)}</p>
        </div>
      </main>
      <footer className={styles.footer}>
        <div>
          <p>postData: {JSON.stringify(postData)}</p>
        </div>
      </footer>
    </div>
  );
}
