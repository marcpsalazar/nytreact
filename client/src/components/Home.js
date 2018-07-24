import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
import API from "../utils/api";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";

// ---------------------------------state-----------------------------
class Home extends Component {
  state = {
    articles: [],
    savedArticles: [],
    startYear: "",
    endYear: "",
    topic: ""
  };

// ------------------------------on page load--------------------------
  componentDidMount() {


  }
// ----------------------new articles --------------------------------
  showArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}

      />
    ));
  }

  handleSaveButton = (article) => {
    API.saveArticle({
      title: article.headline.main,
      date: article.pub_date,
      url: article.web_url
    })
    .then(this.loadSaved)
  }

// -----------------------saved articles ----------------------------
  loadSaved = () => {
    API.getArticles()
      .then(res =>
        this.setState({ savedArticles: res.data, })
      )
      .catch(err => console.log(err));
  };

  showSaved = () => {
      return this.sate.savedArticles.map(save => (
      <Saved
      _id={save.id}
      key={save._id}
      title={save.title}
      date={save.date}
      url={save.url}
      handleDeleteButton={this.handleDeleteButton}
      />
    ))
  }



  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSaved())
      .catch(err => console.log(err));
  };

// -------------------search form------------------------------
  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }

  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }

  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
    .then((res) => {
        this.setState({ articles: res.data.response.docs })

    });

}


// ---------------------------rendering-------------------------
  render() {
    return (
      <div className="main-container">
        <div className="container">
          {/* Jumbotron */}
          <div className="jumbotron">
            <h1 className="text-center"><strong>New York Times Article Search</strong></h1>
            <h2 className="text-center">Search for and save articles of interest.</h2>
          </div>
          {/* Search Form and Results Section */}
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            showArticles={this.showArticles}
          />
          {/* Saved Articles Section */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      <strong>
                        <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }

}

export default Home;
