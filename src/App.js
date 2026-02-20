import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const apikey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const pageSize = 10;
  const country = "us";

  return (
    <div>
      <Router>
        <LoadingBar color="#f11946" progress={progress} height={3} />
        <Navbar/>

        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                apikey={apikey}
                key="home"
                pageSize={pageSize}
                country={country}
                category="general"
              />
            }
          />
          {[
            "general",
            "business",
            "entertainment",
            "health",
            "science",
            "sports",
            "technology",
          ].map((category) => (
            <Route
              exact
              path={`/${category}`}
              key={category}
              element={
                <News
                  setProgress={setProgress}
                  apikey={apikey}
                  key={category}
                  pageSize={pageSize}
                  country={country}
                  category={category}
                />
              }
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
