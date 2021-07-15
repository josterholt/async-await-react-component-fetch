import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
    const [articles, setArticles] = useState<Array<IArticle> | undefined>(
        undefined
    );
    const [error, setError] = useState<any>(null);

    // Function passed into useEffect must be synchronous!
    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                );

                const data: Array<IArticle> = await response.json();
                setArticles(data);
            } catch (error: any) {
                setError(error.message);
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
                <h1 className={styles.title}>Async/Await Example</h1>

                <div className={styles.description}>
                    This is an example of how to use async/await in Next.js.
                    <div>{error}</div>
                    <ul aria-label="articles">
                        {articles &&
                            articles.map((article: IArticle) => {
                                return (
                                    <li key={article.id}>{article.title}</li>
                                );
                            })}
                    </ul>
                </div>
            </main>
        </div>
    );
}
