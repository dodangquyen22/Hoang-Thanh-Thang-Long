import React from 'react';
import { Dimensions } from 'react-native';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const GridEvent = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("EventDetails");
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const data = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    { id: 4, title: 'Item 4' },
    { id: 5, title: 'Item 5' },
    // Thêm nhiều dữ liệu khác ở đây
  ];

  return (

    <FlatList
      data={data}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );


}

export default GridEvent;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  item: {
    width: Dimensions.get('window').width * 0.45,
    height: 80,
    backgroundColor: 'lightgray',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  }
});


