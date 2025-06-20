import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      articles: [],
      totalResults: 0,
    };
  }

  static defaultProps = {
    country: "us",
    pageSize: 8,
    setProgress:0,
    page: 1,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let fetchdata = await fetch(url);
    this.props.setProgress(30);

    let data = await fetchdata.json();
    this.props.setProgress(70);

    //  console.log("Full API response:", data);
    this.setState({
      loading: false,
      articles: data.articles,
      totalResults: data.totalResults,
    });
    this.props.setProgress(100);

  }

  async componentDidMount() {
    this.updateNews();
  }

  // handleprevclick = () => {
  //   this.setState(
  //     { page: this.state.page - 1 },
  //     () => this.updateNews()
  //   );
  // };

  // handlenextclick = () => {
  //   this.setState(
  //     { page: this.state.page + 1 },
  //     () => this.updateNews()
  //   );
  // };

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let fetchdata = await fetch(url);
    let data = await fetchdata.json();
    //  console.log("Full API response:", data);
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NEWS FIRE - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            {
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <Newsitem
                        title={element ? element.title : ""}
                        dis={element ? element.description : ""}
                        imgurl={element.urlToImage}
                        newsurl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                })}
              </div>
            }
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlenextclick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div> */}

      </div>
    );
  }
}
