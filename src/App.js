import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
export default class App extends Component {
  // apikey="85a5f98ec33b4e838fcf6bb13f4cc0ba"
  apikey = process.env.REACT_APP_NEWS_API;

  state={
    progress:0,
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  pageSize =10
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color="#f11946"
        progress={this.state.progress}
      />
          <Navbar />

          <Routes>
            <Route exact path="/" key="/" element={<News setProgress={this.setProgress} apikey={this.apikey} /> } />
            <Route exact
              path="/general"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="general"  pageSize ={this.pageSize} country="us" category="general" />}
            />
            <Route exact
              path="/business"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize ={this.pageSize} country="us" category="business" />}
            />
            <Route exact
              path="/entertainment"
              element={
                <News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize ={this.pageSize} country="us" category="entertainment" />
              }
            />
            <Route exact
              path="/health"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize ={this.pageSize} country="us" category="health" />}
            />
            <Route exact
              path="/science"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize ={this.pageSize} country="us" category="science" />}
            />
            <Route exact
              path="/sports"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize ={this.pageSize} country="us" category="sports" />}
            />
            <Route exact
              path="/technology"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize ={this.pageSize} country="us" category="technology" />}
            />
          </Routes>

        </Router>
      </div>
    );
  }
}
