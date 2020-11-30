import axios from "../../axios/NewYorkTimesAxios";
import News from "../../Models/News";
export const FETCH_NEWS = "FETCH_NEWS";
const numOfNews = 20;
const newsInPage = 10;
export const fetchNews = (search, page) => {
  return async (dispatch, getState) => {
    let newArray = [];
    let numofPage = Math.ceil(numOfNews / newsInPage);
    numofPage = 1;
    // let currPage = page + numofPage;
    let currPage = page;
    if (search === getState().NewsFeed.search && page > 1) {
      newArray = getState().NewsFeed.news;
    }
    console.log(currPage);

    try {
      for (let i = 1; i <= numofPage; i++) {
        const response = await axios.get(
          `articlesearch.json?q=${search}&page=${currPage}`
        );

        let array = response.data.response.docs.map(
          (x) =>
            new News(
              x._id,
              x.headline.main,
              x.multimedia.length > 0 ? x.multimedia[0].url : null,
              x.snippet,
							x.lead_paragraph,
							x.web_url
            )
        );
        newArray = newArray.concat(array);
        // console.log("Array=>" + i, array);
        currPage++;
      }
      // console.log("action newArray", newArray);
      dispatch({
        type: FETCH_NEWS,
        search: search,
        news: newArray,
        currentPage: currPage,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};
