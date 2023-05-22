import React, { useEffect, useState } from "react";
import Document from "../Document/Document";
import styles from "./Documents.module.css";
import { observer } from "mobx-react-lite";
import store from "../../store/store";

const Documents = observer(() => {
  const [isAddButtonActive, setIsAddButtonActive] = useState(true);
  const [nextTen, setNextTen] = useState(10);

  const showNextTen = () => {
    let firstTen = store.publishIds.slice(nextTen, nextTen + 10);
    store.getNextTenPublishes(firstTen);
    setNextTen((prev) => prev + 10);
  };

  useEffect(() => {
    if (nextTen >= store.publishIds.length) {
      setIsAddButtonActive(false);
    }
  }, [nextTen]);

  useEffect(() => {
    if (store.publishIds[0] !== undefined) {
      if (store.publishIds.length <= 10) {
        store.getLessTenPublishes();
        setIsAddButtonActive(false);
        return;
      }
      if (store.publishIds.length > 10) {
        let firstTen = store.publishIds.slice(0, nextTen);
        store.getNextTenPublishes(firstTen);
      }
    }
  }, [store.publishIds]);

  return (
    <div className={styles.general}>
      <h3>Список документов</h3>
      <div className={styles.documents}>
        {store.publishes.map((article, index) => {
          return article.ok === undefined ? (
            <div key={index}></div>
          ) : (
            <Document
              key={article.ok.id}
              date={article.ok.issueDate.substring(0, 10).split("-").join(".")}
              source={article.ok.source.name}
              header={article.ok.title.text}
              isTechNews={article.ok.attributes.isTechNews}
              isAnnouncement={article.ok.attributes.isAnnouncement}
              isDigest={article.ok.attributes.isDigest}
              content={article.ok.content.markup}
              link={article.ok.url}
              words={article.ok.attributes.wordCount}
            />
          );
        })}
      </div>
      <button
        className={isAddButtonActive ? styles.more : styles.hidden}
        onClick={showNextTen}
      >
        Показать больше
      </button>
    </div>
  );
});

export default Documents;
