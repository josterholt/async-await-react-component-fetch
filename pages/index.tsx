import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
    const [article, setArticle] = useState<IArticle | undefined>(undefined);

    // Function passed into useEffect must be synchronous!
    useEffect(() => {
        async function fetchPost() {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts?_delay=3000"
            );

            const data: IArticle = await response.json();
            setArticle(data);
        }
        fetchPost();
    }, []);

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

                <p className={styles.description}>
                    This is an example of how to use async/await in Next.js.
                </p>
            </main>
        </div>
    );
}
