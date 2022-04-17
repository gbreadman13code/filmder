import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { API_KEY } from '../private/private'
import { data } from '../db/data'
import LottieView from 'lottie-react-native';

const MainScreen = ({ route, navigation }) => {
  const [randomMovie, setRandomMovie] = useState({ id: '', name: '', description: '', image: '', release: '', isAdult: false, genre: [], duration: '', isLike: true })
  const [likedMovies, setLikedMovies] = useState([])
  const [isLoad, setIsLoad] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [filters, setFilters] = useState({})
  const [hasParams, setHasParams] = useState(false)

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }
  const makeRuntime = (time) => {
    let hours = Math.floor(time / 60)
    let minutes = time - hours * 60
    if (hours !== 0) {
      return `${hours} ч. ${minutes} м.`
    } else {
      return `${minutes} м.`
    }
  }

  useEffect(() => {
    if (randomMovie.id === '') {
      nextFilmHandler()
    }
  }, [randomMovie])

  useEffect(() => {
    if (route.params != undefined) {
      setFilters(route.params.allFilters)
      setHasParams(true)
    } 
  })

  let count = 0

  const nextFilmHandler = () => {
    count++
    console.log(count)
    setIsLoad(true)
    let randomElFromArray = getRandomInt(1, 694072)
    const randMovieId = data[randomElFromArray]
    if (hasParams === true) {
      fetch(`https://api.themoviedb.org/3/movie/${randMovieId}?api_key=${API_KEY}&language=ru`)
      .then(responsive => responsive.json())
      .then(result => {
        if (result.status_code == 34) {
          nextFilmHandler()
        } else {
          const resultGenreId = result.genres.map(item => item.id)
          const hasId = resultGenreId.some(item => item === filters.genreId)
          if (hasId) {
            if (result.poster_path === null) {
              nextFilmHandler()
            } else {
              setRandomMovie({ id: result.id, name: result.title, description: result.overview, image: result.poster_path, release: result.release_date.slice(0, -6), isAdult: result.adult, genre: result.genres.map(item => `${item.name}`), duration: makeRuntime(result.runtime), isLike: true })
              setIsLoad(false)
            }
          } else {
            nextFilmHandler()
          }
        }
      })
    } else {
      fetch(`https://api.themoviedb.org/3/movie/${randMovieId}?api_key=${API_KEY}&language=ru`)
      .then(responsive => responsive.json())
      .then(result => {
        if (result.status_code == 34) {
          nextFilmHandler()
        } else {
          let yearOfRelease = result.release_date.slice(0, -6)
          if (result.poster_path == null || result.overview === '') {
            nextFilmHandler()
          } else {
            setRandomMovie({ id: result.id, name: result.title, description: result.overview, image: result.poster_path, release: result.release_date.slice(0, -6), isAdult: result.adult, genre: result.genres.map(item => `${item.name}`), duration: makeRuntime(result.runtime), isLike: true })
            setIsLoad(false)
          }
        }
      })
    }

  }
  const genreList = randomMovie.genre.join(', ')

  const addToLoved = () => {
    const isLiked = likedMovies.some(item => item.id === randomMovie.id)
    if (isLiked === false) {
      setIsLike(true)
      setTimeout(() => {
        setIsLike(false)
        nextFilmHandler()

      }, 300)
      setLikedMovies(likedMovies => [...likedMovies, randomMovie])
    }
  }

  const moveToWishList = () => {
    navigation.navigate('Избранное', { likedMovies, })
  }

  const animation = React.useRef(null)

  const moveToFilter = () => {
    if (hasParams === true) {
      console.log('Параметры есть. Передаем...')
      navigation.navigate('Filter', { filters })
    } else {
      console.log('Параметров поиска нет. Переходим просто так')
      navigation.navigate('Filter')
    }
    
  }

  useEffect(() => {
    if (isLike) {
      animation.current.play(0, 23)
    } else {
      animation.current.play(0, 0)
    }
  }, [isLike])
  useEffect(() => {
    if (isLoad) {
      animation.current.play(0, 25)
    } else {
      animation.current.play(0, 0)
    }
  }, [isLoad])

  return (
    <>
      <View style={{ flex: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        {isLoad === true ?
          <>
            <LottieView
              ref={animation}
              style={{ width: 200, height: 200, marginLeft: -2}}
              source={require('../assets/load.json')}
              autoPlay
            />
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Подбираем фильм...</Text>
          </>
          :
          <>
            <TouchableOpacity style={styles.navButtonLeft} onPress={addToLoved} onLongPress={moveToWishList}></TouchableOpacity>
            <TouchableOpacity style={styles.navButtonRight} onPress={nextFilmHandler} onLongPress={moveToFilter} activeOpacity={0.1}></TouchableOpacity>
            <ScrollView style={{ width: '100%', }}>

              <ImageBackground source={{ uri: `https://www.themoviedb.org/t/p/w1280/${randomMovie.image}` }} style={styles.backgroundImage} blurRadius={90}>
                <View style={styles.imageContainer}>
                  <LottieView
                    ref={animation}
                    style={styles.like}
                    source={require('../assets/like.json')}
                    autoPlay={false}
                    loop={false}
                  />
                  {randomMovie.isAdult == true ? <Image style={styles.disclaimer} source={{ width: 90, height: 90, uri: 'https://cdn-icons-png.flaticon.com/512/3728/3728706.png' }} /> : <View></View>}
                  <Image style={{ borderRadius: 30 }} source={{ width: 266, height: 400, uri: `https://www.themoviedb.org/t/p/w1280/${randomMovie.image}` }} />
                </View>
              </ImageBackground>
              <View style={{ backgroundColor: 'black', flex: 2 }}>
                <Text style={{
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  width: '100%',
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 30,
                  textTransform: 'uppercase',
                  fontWeight: 'bold'
                }}>
                  {randomMovie.name} <Text style={{ fontSize: 20, fontWeight: 'normal' }}>{randomMovie.release}</Text>
                </Text>
                <Text style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, textAlign: 'center', color: '#fff' }}>{genreList} {randomMovie.duration}</Text>
                <View style={{ width: '100%' }}>
                  <View style={styles.descriptionWrapper}>
                    <Text style={styles.description}>{randomMovie.description}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>

          </>
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
  },
  like: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: 80,
    left: 15,
    zIndex: 2
  },
  addLike: {
    position: 'absolute',
    top: 420,
    left: 50,
    zIndex: 2,
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
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  description: {
    color: '#fff',
    fontSize: 17,
  },
})