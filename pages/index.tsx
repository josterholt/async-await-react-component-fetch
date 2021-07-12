import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
    const [article, setArticle] = useState<IArticle | undefined>(undefined);
    const [title, setTitle] = useState<string>("");

    // Function passed into useEffect must be synchronous!
    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts?_delay=3000"
                );
                console.log("setting title");
                setTitle("Async/Await Example");
                const data: IArticle = await response.json();
                setArticle(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPost();
    }, []);

    return (
        <div className={styles.container} data-testid="home-container">
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Async/await example in Next.js"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>{title}</h1>

                <p className={styles.description}>
                    This is an example of how to use async/await in Next.js.
                </p>
            </main>
        </div>
    );
}
