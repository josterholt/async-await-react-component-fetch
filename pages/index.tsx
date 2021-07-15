import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import useFetch from "../utils/useFetch";

export default function Home() {
    const {
        response,
        data: articles,
        error,
    } = useFetch("https://jsonplaceholder.typicode.com/posts");

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
                    Async/Await Example App
                </h1>

                <div className={styles.description}>
                    This is an example of how to use async/await in Next.js.
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
