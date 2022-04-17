import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'

const WishList = ({ route, navigation: { goBack } }) => {

  const [moviesList, setMoviesList] = useState([])
  const [unlike, setUnlike] = useState(false)

  const animation = React.useRef(null)

  useEffect(() => {
    setMoviesList(route.params.likedMovies)
    if (moviesList.length > 1) {
      if (moviesList.isLike === true) {
        animation.current.play(114, 114)
      } else {
        animation.current.play(114, 114)
      }
    } else {
      console.log('first')
    }
  }, [moviesList])



  const removeFromFavorites = (id) => {
    let index = 0
    moviesList.find(item => {
      if (item.id === id) {
        index = moviesList.indexOf(item)
      }
    })
    setUnlike(true)
    setTimeout(() => {
      setUnlike(false)
      setMoviesList(moviesList.splice(index, 1))
      if (moviesList.length === 0) {
        goBack()
      }
    }, 100)

  }

  const Item = ({ name, image, id, onPress }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity activeOpacity={0.9} style={styles.filmInfo}>
        <Image style={styles.filmPoster} source={{ uri: image }} />
        <Text style={styles.filmNameText}>{name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <LottieView
          ref={animation}
          style={styles.unlike}
          source={require('../assets/unlike.json')}
          autoPlay={false}
          loop={false}
        />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item onPress={() => { removeFromFavorites(item.id) }} name={item.name} image={`https://www.themoviedb.org/t/p/w1280/${item.image}`} id={item.id} />
  );
  return (

    <View style={{ backgroundColor: 'black', height: '100%', }}>
      <FlatList
        data={route.params.likedMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{ width: '100%' }}
      />
    </View>

  )
}

export default WishList

const styles = StyleSheet.create({
  unlike: {
    width: 100,
    height: 100,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  filmInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10
  },
  filmPoster: {
    width: 75,
    height: 115
  },
  filmNameText: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 10,
    width: 250
  }
})