import React, { useEffect, useState } from "react";

export default function ArticleList() {
    const [articles, setArticles] = useState<Array<IArticle> | undefined>(
        undefined
    );
    const [error, setError] = useState<any>(null);

    const fetchController = new AbortController();
    const signal = fetchController.signal;

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

        return () => {
            fetchController.abort();
        };
    }, []);

    return (
        <div>
            This is an example of how to use async/await in Next.js.
            <div>{error}</div>
            <ul aria-label="articles">
                {articles &&
                    articles.map((article: IArticle) => {
                        return <li key={article.id}>{article.title}</li>;
                    })}
            </ul>
        </div>
    );
}
