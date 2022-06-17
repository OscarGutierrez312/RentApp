import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"

export default function Header(){
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const [content, setContent] = useState()
    useEffect(() => {
        const fetchData = async () => {
          const res = await fetch("/api/examples/protected")
          const json = await res.json()
          if (json.content) {
            console.log(json.content)
            setContent(json.content)
          }
        }
        fetchData()
      }, [session])

    return (
        <header>
        <noscript>
            <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
        </noscript>
        <script>console.log(useSession());</script>
        <div className={styles.signedInStatus}>
        <p
            className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
          >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
            )}
            </p>
        </div>
        </header>
    );
}