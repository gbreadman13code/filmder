import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
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
        console.log(result)
        if (result.status_code == 34) {
          nextFilmHandler()
        } else {
          if (result.poster_path == null || result.release_date == '' || result.genres == [] || result.title.charCodeAt() < 1040 || result.title.charCodeAt() > 1103) {
            nextFilmHandler()
          } else {
            console.log(result.title.charCodeAt())
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
  const genreList = randomMovie.genre.map((item) =>
    <Text style={styles.genres}>{item}</Text>
  )

  return (
    <>

      <View style={{ flex: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <TouchableOpacity style={styles.navButtonLeft}></TouchableOpacity>
        <TouchableOpacity style={styles.navButtonRight} activeOpacity={0.1} onPress={nextFilmHandler}></TouchableOpacity>
        {isLoad === true ?

          <>
            <ActivityIndicator size='large' color='white' />
            <Text style={{ color: 'white' }}>Подбираем фильм...</Text>
          </>

          :
          <ImageBackground source={{ uri: `https://www.themoviedb.org/t/p/w1280/${randomMovie.image}` }} style={styles.backgroundImage} blurRadius={90}>
            <View style={{ height: 40 }}></View>
            <ScrollView>
              <View style={styles.imageContainer}>
                {randomMovie.isAdult == true ? <Image style={styles.disclaimer} source={{ width: 90, height: 90, uri: 'https://cdn-icons-png.flaticon.com/512/3728/3728706.png' }} /> : <View></View>}
                <Image source={{ width: 333, height: 500, uri: `https://www.themoviedb.org/t/p/w1280/${randomMovie.image}` }} />
              </View>
              <Text style={{
                paddingVertical: 15,
                paddingHorizontal: 30,
                // backgroundColor: '#fff',
                width: '100%',
                color: '#fff',
                textAlign: 'center',
                fontSize: 30,
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}>
                {randomMovie.name} <Text style={{ fontSize: 20, fontWeight: 'normal' }}>{randomMovie.release}</Text>
              </Text>
              <View style={{ width: '100%' }}>
                <View style={styles.descriptionWrapper}>
                  <Text style={styles.description}>{randomMovie.description}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, justifyContent: 'center' }}>{genreList}</View>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        }

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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 40
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
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
  textHeader: {
    color: '#fff',
    fontSize: 25,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    textTransform: 'uppercase',
    marginVertical: 10,
  },
  genres: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginRight: 5,
    borderColor: '#fff',
    borderRadius: 15,
    color: '#fff',
    textTransform: 'uppercase',
    // backgroundColor: '#fff',
    marginTop: 5
  },
  descriptionWrapper: {
    paddingHorizontal: 40,
    width: '100%'
  },
  description: {
    color: '#fff',
    fontSize: 17
  },
})