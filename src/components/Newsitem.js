import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let { title, dis, imgurl, newsurl, author, date } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              imgurl
                ? imgurl
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png"
            }
            className="card-img-top"
            alt="News"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{dis}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : " Unknown"} On{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsurl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
