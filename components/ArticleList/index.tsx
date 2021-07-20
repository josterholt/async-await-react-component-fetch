import React, { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import styles from "../../styles/ArticleList.module.css";

export default function ArticleList() {
    const { data: articles, error } = useFetch(
        "https://jsonplaceholder.typicode.com/posts"
    );

    return (
        <div>
            <div className={styles.sectionSummary}>
                This is an example of how to use async/await in Next.js.
            </div>
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
