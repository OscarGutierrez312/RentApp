import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"

export default function Header(){
    const { data: session, status } = useSession()

    return (
        <header>
        </header>
    );
}