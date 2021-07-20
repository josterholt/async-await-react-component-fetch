import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ArticleList from "../components/ArticleList";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Async/await example in Next.js"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Async/Await Example</h1>
                <ArticleList />
            </main>
        </div>
    );
}
