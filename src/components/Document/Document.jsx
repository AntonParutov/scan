import React from "react";
import styles from "./Document.module.css";
import { Link } from "react-router-dom";

const Document = (props) => {
  let XMLParser = require("react-xml-parser");
  let xml = new XMLParser().parseFromString(props.content);
  let xmlText = xml.getElementsByTagName("sentence");
  let xmlImg = "";
  if (props.content.match(/https?:\/\/\S+"/g) === null) {
    xmlImg = "";
  } else {
    xmlImg = props.content
      .match(/https?:\/\/\S+"/g)
      .toString()
      .replace('"', "");
  }
  return (
    <div className={styles.general}>
      <div className={styles.info}>
        <span className={styles.date}>{props.date}</span>
        <span className={styles.source}>{props.source}</span>
      </div>
      <h4 className={styles.header}>{props.header}</h4>
      {props.isTechNews ? (
        <span className={styles.kind}>Технические новости</span>
      ) : (
        <></>
      )}
      {props.isAnnouncement ? (
        <span className={styles.kind}>Объявление</span>
      ) : (
        <></>
      )}
      {props.isDigest ? <span className={styles.kind}>Дайджест</span> : <></>}
      <div className={styles.imageContainer}>
        <img src={xmlImg} alt="Картинка отсутсвует" />
      </div>
      <div className={styles.text}>
        {xmlText.map((paragraph, index) => {
          return (
            <p key={index}>
              {paragraph.value
                .replace(/<\/?[^>]+(>|$)/g, "")
                .replace(/&\/?[^>]+(;|$)/g, "")}
            </p>
          );
        })}
      </div>
      <div className={styles.bottomSection}>
        <Link to={props.link} target={"_blank"}>
          Читать в источнике
        </Link>
        <span>{props.words} слова</span>
      </div>
    </div>
  );
};

export default Document;