import React, { useEffect, useState } from "react";
import styles from "./Summary.module.css";
import DateResult from "../DateResult/DateResult";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { useNavigate } from "react-router";

const Summary = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (store.isSummaryAllowed === false) {
      navigate("/search");
    }
  }, []);

  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isNextArrowUp, setIsNextArrowUp] = useState(true);

  const bigScreen = window.matchMedia("(min-width: 1300px) ");
  const mediumScreen = window.matchMedia(
    "(min-width: 768px) and (max-width: 1299px)"
  );
  const smallScreen = window.matchMedia("(max-width: 767px)");

  useEffect(() => {
    const onResize = () => {
      if (bigScreen.matches && store.summaryDates.length > 8) {
        setMinIndex(0);
        setMaxIndex(7);
        setIsNextArrowUp(true);
        return;
      }
      if (bigScreen.matches && store.summaryDates.length <= 8) {
        setMinIndex(0);
        setMaxIndex(store.summaryDates.length);
        setIsNextArrowUp(false);
        return;
      }
      if (mediumScreen.matches) {
        setMinIndex(0);
        setMaxIndex(3);
        setIsNextArrowUp(true);
        return;
      }
      if (smallScreen.matches) {
        setMinIndex(0);
        setMaxIndex(0);
        setIsNextArrowUp(true);
        return;
      }
    };
    bigScreen.addListener(onResize);
    mediumScreen.addListener(onResize);
    smallScreen.addListener(onResize);
    onResize();
    return () => {
      bigScreen.removeListener(onResize);
      mediumScreen.removeListener(onResize);
      smallScreen.removeListener(onResize);
    };
  }, [
    bigScreen.matches,
    mediumScreen.matches,
    smallScreen.matches,
    store.summaryDates.length,
  ]);

  useEffect(() => {
    if (
      store.summaryResults.status === 200 &&
      store.summaryResults.data !== []
    ) {
      store.setSummaryDates(
        store.summaryResults.data.data[0].data.map((el) =>
          el.date.substring(0, 10).split("-").join(".")
        )
      );
      store.setSummaryAll(
        store.summaryResults.data.data[0].data.map((el) => el.value)
      );
      store.setSummaryRisks(
        store.summaryResults.data.data[1].data.map((el) => el.value)
      );
      store.setSummaryArticles(
        store.summaryAll.reduce((a, b) => {
          return a + b;
        }) +
          store.summaryRisks.reduce((a, b) => {
            return a + b;
          })
      );
    }
  }, [store.summaryResults]);

  return (
    <div className={styles.general}>
      <h3>Общая сводка</h3>
      {store.summaryResults.status === 200 &&
      store.summaryResults.data !== [] ? (
        <>
          <p>
            Найдено{" "}
            <span className={styles.resultsCount}>{store.summaryArticles}</span>{" "}
            вариантов
          </p>
          <div className={styles.resultsBlock}>
            <button
              className={
                minIndex === 0
                  ? `${styles.buttonLeft} ${styles.inactive}`
                  : `${styles.buttonLeft}`
              }
              disabled={minIndex === 0 ? true : false}
              onClick={() => {
                setMinIndex((index) => index - 1);
                setMaxIndex((index) => index - 1);
              }}
            ></button>
            <div className={styles.results}>
              <div className={styles.resultsHeaders}>
                <span>Период</span>
                <span>Всего</span>
                <span>Риски</span>
              </div>
              <div className={styles.resultsValues}>
                {store.summaryResults.data.data[0].data.map((el, index) => {
                  return index < minIndex || index > maxIndex ? (
                    <div key={index}></div>
                  ) : (
                    <DateResult
                      key={index}
                      date={store.summaryDates[index]}
                      all={store.summaryAll[index]}
                      risks={store.summaryRisks[index]}
                    />
                  );
                })}
              </div>
            </div>
            <button
              className={
                maxIndex === store.summaryDates.length - 1 ||
                isNextArrowUp === false
                  ? `${styles.buttonRight} ${styles.inactive}`
                  : `${styles.buttonRight}`
              }
              disabled={
                maxIndex === store.summaryDates.length - 1 ||
                isNextArrowUp === false
                  ? true
                  : false
              }
              onClick={() => {
                setMinIndex((index) => index + 1);
                setMaxIndex((index) => index + 1);
              }}
            ></button>
          </div>
        </>
      ) : (
        <div>Заглушка на случай иного решения</div>
      )}
    </div>
  );
});

export default Summary;
