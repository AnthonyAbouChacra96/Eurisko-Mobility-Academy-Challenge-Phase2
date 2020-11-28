import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  SafeAreaView,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../constants/Colors";
import axios from "../axios/NewYorkTimesAxios";
import * as newsFeedActions from "../Store/Actions/NewsFeed";
import { useSelector, useDispatch } from "react-redux";
import * as newsActions from "../Store/Actions/NewsFeed";
import NewsItem from "../Components/News/NewsItem";
import { IMG_BASE_PATH } from "@env";
const NewsFeedScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");
  const newsFeed = useSelector((state) => state.NewsFeed.news);
  const initialSearch = useSelector((state) => state.NewsFeed.search);
  const currentPage = useSelector((state) => state.NewsFeed.currentPage);
  const dispatch = useDispatch();
  let timeout = null;
  const loadNewsFeed = useCallback(
    async (search, page) => {
      setError(null);
      setIsRefreshing(true);
      try {
        await dispatch(newsActions.fetchNews(search, page));
      } catch (err) {
        setError(err.message);
      }
      setIsRefreshing(false);
    },
    [dispatch, setIsLoading, setError]
  );

  const updateSearch = useCallback(
    (search) => {
      setSearch(search);

      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        console.log("timeout", search);
      }, 3000);
    },
    [setSearch]
  );
  useEffect(() => {
    console.log("useeffect");
    setIsLoading(true);
    loadNewsFeed(initialSearch, 1).then(() => {
      setIsLoading(false);
    });
    console.log("loaded");
  }, [loadNewsFeed]);
  //console.log("NewsFeedScreen", newsFeed);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          lightTheme
          value={search}
        />
        <FlatList
          onRefresh={loadNewsFeed}
          refreshing={isRefreshing}
          data={newsFeed}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.7}
          onEndReached={({ distanceFromEnd }) => {
            console.log("reached", distanceFromEnd);
            if (distanceFromEnd <= 0) return;
            console.log(currentPage);
            loadNewsFeed(initialSearch, currentPage);
          }}
          renderItem={(itemData) => (
            // <TouchableOpacity onPress={() => {}}>
            //   <View
            //     style={{
            //       borderColor: "black",
            //       borderWidth: 1,
            //       marginVertical: 20,
            //     }}
            //   >
            //     <Text>{itemData.item.title}</Text>
            //   </View>
            // </TouchableOpacity>
            <NewsItem
              title={itemData.item.title}
              description={itemData.item.shortDescription}
              image={IMG_BASE_PATH + itemData.item.imageUri}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "NewYork Times",
  };
};

export default NewsFeedScreen;
