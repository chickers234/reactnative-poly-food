import database from '@react-native-firebase/database';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  View,
} from 'react-native';
import DiscountsItem from '../../components/List/DiscountsItem';
import {StoreContext} from '../../utils/store';
const {width, height} = Dimensions.get('window');

const PostsScreen = () => {
  const {settingApp} = useContext(StoreContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const onValueChange = database()
      .ref('/News/Discounts')
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
    <DiscountsItem
      image={item.image}
      code={item.code}
      type={item.type}
      value={item.value}
      number={item.number}
      date_start={item.date_start}
      date_end={item.date_end}
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
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => _renderItem(item)}
      />
    </View>
  );
};

export default PostsScreen;

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
