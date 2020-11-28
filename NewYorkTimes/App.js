import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import { SearchBar } from "react-native-elements";
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import CustColors from "./constants/Colors";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import newsFeedReducer from './Store/Reducers/NewsFeed';
import AppNavigator from './Navigator/AppNavigator';
const rootReducer = combineReducers({
NewsFeed:newsFeedReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {
 
	  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

