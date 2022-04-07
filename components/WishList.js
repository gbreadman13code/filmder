import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const WishList = ({ route, navigation }) => {

  const Item = ({ name, image, genre }) => (
    <View style={{width: '100%',}}>
      <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row' }}>
        <Image source={{ width: 111, height: 150, uri: image }} />
        <View>
          <Text style={{color: 'white', fontSize: 20}}>{name}</Text>
          <Text>{genre}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item name={item.name} image={`https://www.themoviedb.org/t/p/w1280/${item.image}`} genre={item.genre} />
  );

  return (
    <View style={{backgroundColor: 'black'}}>
      <FlatList
        data={route.params.likedMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{width: '100%'}}
      />
    </View>
  )
}

export default WishList

const styles = StyleSheet.create({})