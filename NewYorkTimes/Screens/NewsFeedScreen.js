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
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../constants/Colors";
import axios from "../axios/NewYorkTimesAxios";
import * as newsFeedActions from "../Store/Actions/NewsFeed";
import { useSelector, useDispatch } from "react-redux";
import * as newsActions from "../Store/Actions/NewsFeed";
import NewsItem from "../Components/News/NewsItem";
import { IMG_BASE_PATH } from "@env";
import Modal from '../Components/UI/Modal';
import NewsFeedDetail from '../Components/News/NewsFeedDetail';
const NewsFeedScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState();
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
				loadNewsFeed(search?search:'election',1)
      }, 2000);
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
	const toggleModalHandler=()=>{
		setModalVisible(!modalVisible);
	};
	const onNewsItemSelectedHandler =(id)=>{
		const selectedNews=newsFeed.find(x=>x.id===id);
		setModalData(selectedNews);
		setModalVisible(true);
		console.log(selectedNews);

	};
	let newsFeedDetails = (
    <View>
      <Modal isVisible={modalVisible} toggleModal={toggleModalHandler}>
        <NewsFeedDetail
          data={modalData}
          // image={modalData.imageUri?modalData.imageUri:null}
        />
      </Modal>
      <FlatList
        // onRefresh={loadNewsFeed}
        // refreshing={isRefreshing}
        refreshControl={
          <RefreshControl
            colors={[Colors.primary]}
            refreshing={isRefreshing}
            onRefresh={loadNewsFeed}
          />
        }
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
            image={
              itemData.item.imageUri
                ? IMG_BASE_PATH + itemData.item.imageUri
                : null
            }
            id={itemData.item.id}
            onSelect={onNewsItemSelectedHandler}
          />
        )}
      />
    </View>
  );
		 if (error) {
       return (
         <View style={styles.centered}>
           <Text>An error occurred!</Text>
           <Button
             title="Try again"
             onPress={loadProducts}
             color={Colors.primary}
           />
         </View>
       );
     }

     if (isLoading) {
       newsFeedDetails= (
         <View style={styles.centered}>
           <ActivityIndicator size="large" color={Colors.primary} />
         </View>
       );
     }

     if (!isLoading && newsFeed.length === 0) {
       newsFeedDetails = (
         <View style={styles.centered}>
           <Text>No News Found!</Text>
         </View>
       );
     }
		 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          lightTheme
          value={search}
        />
        {
          newsFeedDetails
        }
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "The New York Times",
  };
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
export default NewsFeedScreen;
