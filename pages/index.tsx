import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import useFetch from "../utils/useFetch";

export default function Home() {
    // const [articles, setArticles] = useState<Array<IArticle> | undefined>(
    //     undefined
    // );
    const [title, setTitle] = useState<string>("");

    const {
        response,
        data: articles,
        error,
    } = useFetch("https://jsonplaceholder.typicode.com/posts?_delay=3000");

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
                <h1 className={styles.title} data-testid="title-heading">
                    {title}
                </h1>

                <div className={styles.description}>
                    This is an example of how to use async/await in Next.js.
                    {articles &&
                        articles.map((article: IArticle) => {
                            return <div key={article.id}>{article.title}</div>;
                        })}
                </div>
            </main>
        </div>
    );
}
