import axios from "axios";

const api = {
  searchNYT: function(topic, startYear, endYear) {
    const authKey = "996e3a9b63494feeb85afbd1e74b7c71";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231";
  console.log(queryURL);
  return axios.get(queryURL);
  },
  getArticle: function() {
    return axios.get("/api/article");
  },
  saveArticle: function(articleObj) {
    return axios.post("/api/articles", articleObj);
  },
  deleteArticle: function(id) {
    return axios.delete(`/api/articles/${id}`);
  }
};
export default api;
