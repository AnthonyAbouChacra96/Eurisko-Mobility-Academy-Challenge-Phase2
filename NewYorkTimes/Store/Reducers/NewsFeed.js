import * as newsActions from "../Actions/NewsFeed";

const initialState = {
	news: [],
	search:'election',
	currentPage:1
};

const NewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case newsActions.FETCH_NEWS:
      return {
        ...state,
        news: [...action.news],
        search: action.search,
        currentPage: action.currentPage,
      };
    default:
      return state;
  }
};

export default NewsReducer;
