import database from '@react-native-firebase/database';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import NewsItem from '../../components/List/NewsItem';
import {StoreContext} from '../../utils/store';
const {width, height} = Dimensions.get('window');

const NewsScreen = () => {
  const {settingApp} = useContext(StoreContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const onValueChange = database()
      .ref('/News')
      .on('value', (snapshot) => {
        let newsList = [];
        snapshot.forEach((child) => {
          newsList.push(child.val());
        });
        setData(newsList);
      });

    return () => database().ref('/News').off('value', onValueChange);
  }, []);

  const _renderItem = ({item}) => (
    <NewsItem
      title={item.title}
      happy={item.happy}
      picture={item.picture}
      time={item.time}
    />
  );

  if (!data.length) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size="large"
          color={settingApp.settingApp.backgroundColor}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: settingApp.settingApp.backgroundColor,
          height: 40,
        }}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => _renderItem(item)}
      />
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
