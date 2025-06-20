import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./loading";
import PropTypes from "prop-types";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };



  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ee75377d2db646ac8657b3ef3071364c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let fetchdata = await fetch(url);
    let data = await fetchdata.json();
     console.log("Full API response:", data); 
    this.setState({
      loading: false,
      articles: data.articles,
      totalResults: data.totalResults,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleprevclick = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      () => this.updateNews() // runs after state is updated
    );
  };

  handlenextclick = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => this.updateNews() // runs after state is updated
    );
  };


  

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NEWS FIRE - Top Headlines</h1>

        {this.state.loading && <Spinner />}

        {!this.state.loading && (
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
        )}

        <div className="container d-flex justify-content-between">
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
        </div>
      </div>
    );
  }
}
