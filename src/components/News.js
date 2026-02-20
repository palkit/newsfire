import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  // const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pageSize=${props.pageSize}`;
    let fetchdata = await fetch(url);
    props.setProgress(30);

    let data = await fetchdata.json();
    props.setProgress(70);

    setArticles(data.articles );
    // setTotalResults(data.totalResults );
    setHasMore(data.articles.length < data.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pageSize}`;
    let fetchdata = await fetch(url);
    let data = await fetchdata.json();

    const newArticles = data.articles || [];

    if (newArticles.length === 0) {
      setHasMore(false);
      return;
    }

    const updatedArticles = articles.concat(newArticles);
    setArticles(updatedArticles);
    setPage(nextPage);
    // setTotalResults(data.totalResults);
  };

  return (
    <div className="container-fluid px-3 px-md-5 my-3">
      <h1 className="text-center  " style={{ marginTop: "70px" }}>
        NEWS FIRE - Top Headlines
      </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
        scrollThreshold={0.9}
      >
        <div className="container">
          <div className="row justify-content-center">
            {articles.map((element) => (
              <div className="col-md-4 mb-4" key={element.url}>
                <Newsitem
                  title={element.title || ""}
                  dis={element.description || ""}
                  imgurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            ))}

            { !hasMore && (
              <p className="text-center my-3 text-muted">
                ✅ You’ve reached the end of news articles.
              </p>
            )}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
  setProgress: () => {},
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string.isRequired,
  setProgress: PropTypes.func,
};

export default News;
