import React, { useState, useEffect } from "react";
import styles from "./WhyWe.module.css";
import WhyWeCard from "../WhyWeCard/WhyWeCard";

const WhyWe = () => {
  const clockImg = require("./Maskgroupclock.png");
  const glassImg = require("./Maskgroupglass.png");
  const shieldImg = require("./Maskgroupshield.png");

  const Cards = [
    {
      id: 1,
      image: clockImg,
      text: "Высокая и оперативная скорость обработки заявки",
    },
    {
      id: 2,
      image: glassImg,
      text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    },
    {
      id: 3,
      image: shieldImg,
      text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    },
    {
      id: 4,
      image: clockImg,
      text: "Высокая и оперативная скорость обработки заявки",
    },
    {
      id: 5,
      image: glassImg,
      text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    },
    {
      id: 6,
      image: shieldImg,
      text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    },
  ];

  const [visibleCards, setVisibleCards] = useState([1, 2, 3]);

  const nextButton = () => {
    let newVisibleCards = Object.assign([], visibleCards);
    newVisibleCards[0] = newVisibleCards[0] + 1;
    newVisibleCards[1] = newVisibleCards[1] + 1;
    if (newVisibleCards[2] === Cards.length) {
      newVisibleCards[2] = 3;
      newVisibleCards[1] = 2;
      newVisibleCards[0] = 1;
      setVisibleCards(newVisibleCards);
      return;
    }
    newVisibleCards[2] = newVisibleCards[2] + 1;
    setVisibleCards(newVisibleCards);
  };

  const prevButton = () => {
    let newVisibleCards = Object.assign([], visibleCards);
    if (newVisibleCards[0] === 1) {
      newVisibleCards[2] = Cards.length;
      newVisibleCards[1] = Cards.length - 1;
      newVisibleCards[0] = Cards.length - 2;
      setVisibleCards(newVisibleCards);
      return;
    }
    newVisibleCards[0] = newVisibleCards[0] - 1;
    newVisibleCards[1] = newVisibleCards[1] - 1;
    newVisibleCards[2] = newVisibleCards[2] - 1;
    setVisibleCards(newVisibleCards);
  };

  const [visibleCard, setVisibleCard] = useState(0);
  const screenWidth = window.matchMedia("(min-width: 980px) ");
  const [isBigScreen, setIsBigScreen] = useState(true);

  const smallNextButton = () => {
    let newCard = visibleCard + 1;
    if (newCard > Cards.length - 1) {
      setVisibleCard(0);
      return;
    }
    setVisibleCard((prev) => prev + 1);
  };
  const smallPrevButton = () => {
    let newCard = visibleCard - 1;
    if (newCard < 0) {
      setVisibleCard(Cards.length - 1);
      return;
    }
    setVisibleCard((prev) => prev - 1);
  };

  useEffect(() => {
    const onResize = () => {
      if (screenWidth.matches) {
        setIsBigScreen(true);
        console.log("Большой");
        return;
      }
      if (!screenWidth.matches) {
        setIsBigScreen(false);
        console.log("Маленький");
        return;
      }
    };
    screenWidth.addListener(onResize);
    return () => {
      screenWidth.removeListener(onResize);
    };
  }, [screenWidth]);

  return (
    <div className={styles.general}>
      <h2>Почему именно мы</h2>
      <div className={styles.cardContainer}>
        {isBigScreen ? (
          <button
            className={styles.previosButton}
            onClick={prevButton}
          ></button>
        ) : (
          <button
            className={styles.previosButton}
            onClick={smallPrevButton}
          ></button>
        )}
        {isBigScreen ? (
          Cards.map((card) => {
            if (
              card.id === visibleCards[0] ||
              card.id === visibleCards[1] ||
              card.id === visibleCards[2]
            ) {
              return (
                <WhyWeCard key={card.id} image={card.image} text={card.text} />
              );
            }
          })
        ) : (
          <WhyWeCard
            key={Cards[visibleCard].id}
            image={Cards[visibleCard].image}
            text={Cards[visibleCard].text}
          />
        )}
        {isBigScreen ? (
          <button className={styles.nextButton} onClick={nextButton}></button>
        ) : (
          <button
            className={styles.nextButton}
            onClick={smallNextButton}
          ></button>
        )}
      </div>
    </div>
  );
};

export default WhyWe;
