import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { API_KEY } from '../private/private'


const MainScreen = () => {

  const [randomMovie, setRandomMovie] = useState({
    name: '',
    description: '',
    image: '',
    release: '',
    isAdult: false,
    genre: []
  })
  const [isLoad, setIsLoad] = useState(false)

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

  const nextFilmHandler = () => {
    setIsLoad(true)
    const randMovieId = getRandomInt(1, 999999)
    fetch(`https://api.themoviedb.org/3/movie/${randMovieId}?api_key=${API_KEY}&language=ru`)
      .then(responsive => responsive.json())
      .then(result => {
        if (result.status_code == 34) {
          nextFilmHandler()
        } else {
          if (result.poster_path == null || result.overview == '') {
            nextFilmHandler()
          } else {
            setRandomMovie({
              name: result.title,
              description: result.overview,
              image: result.poster_path,
              release: result.release_date.slice(0, -6),
              isAdult: result.adult,
              genre: result.genres.map(item => `${item.name}`)
            })
            setIsLoad(false)
          }
        }
        
      })
  }
  console.log(isLoad)
  const genreList = randomMovie.genre.join(', ')

  return (
    <>
      <View style={{ flex: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <TouchableOpacity style={styles.navButtonLeft}></TouchableOpacity>
        <TouchableOpacity style={styles.navButtonRight} activeOpacity={0.1} onPress={nextFilmHandler}></TouchableOpacity>
        <Text style={{ 
          marginTop: 35, 
          paddingVertical: 15, 
          paddingHorizontal: 30, 
          backgroundColor: '#fff', 
          width: '100%', 
          textAlign: 'center', 
          fontSize: 20 }}>
            {randomMovie.name} ({randomMovie.release})
        </Text>
        <ScrollView>
          <View style={styles.imageContainer}>
            {randomMovie.isAdult == true ? <Image style={styles.disclaimer} source={{width: 90, height: 90, uri: 'https://cdn-icons-png.flaticon.com/512/3728/3728706.png'}}/> : <View></View>}
            {isLoad === true ? <ActivityIndicator size='large' color='white' /> : <Image source={{ width: 333, height: 500, uri: `https://www.themoviedb.org/t/p/w1280/${randomMovie.image}`}}/> }
          </View>
          <View style={{ width: '100%' }}>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.textHeader}>Описание</Text>
              <Text style={styles.description}>{randomMovie.description}</Text>
              <ScrollView horizontal={true}>
                <Text style={[styles.textHeader, styles.genre]}>Жанр: {genreList}</Text>
              </ScrollView>
              <Text style={styles.textHeader}>Год выпуска: {randomMovie.release}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 40
  },
  disclaimer: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 33
  },
  navButtonLeft: {
    width: '50%',
    height: 500,
    position: 'absolute',
    top: 164,
    left: 0,
    zIndex: 2,
  },
  navButtonRight: {
    width: '50%',
    height: 500,
    position: 'absolute',
    top: 164,
    right: 0,
    zIndex: 2,
  },
  isFavoriteContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: 50,
    backgroundColor: '#fff'
  },
  textHeader: {
    color: '#fff',
    fontSize: 25,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    textTransform: 'uppercase',
    marginVertical: 10,
  },
  genre: {
    fontSize: 15
  },
  descriptionWrapper: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    width: '100%'
  },
  description: {
    color: '#fff',
    fontSize: 17
  },
})