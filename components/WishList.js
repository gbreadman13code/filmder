import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const WishList = ({route, navigation}) => {

  const Item = ({ name, image, genre }) => (
    <TouchableOpacity activeOpacity={0.9}>
      <Text>{name}</Text>
      <Image source={{ width: 300, height: 400, uri: image}}/>
      <Text>{genre}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item name={item.name} image={`https://www.themoviedb.org/t/p/w1280/${item.image}`} genre={item.genre}/>
  );

  return (
    <FlatList
        data={route.params.likedMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
  )
}

export default WishList

const styles = StyleSheet.create({})