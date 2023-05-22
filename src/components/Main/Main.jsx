import React from "react";
import { Route, Routes } from "react-router";
import Authorization from "../../pages/Authorization/Authorization";
import Landing from "../../pages/Landing/Landing";
import Search from "../../pages/Search/Search";
import SearchResult from "../../pages/SearchResult/SearchResult";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <div className={styles.general}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Authorization />} />
        <Route path="/search" element={<Search />} />
        <Route path="/result" element={<SearchResult />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </div>
  );
};

export default Main;