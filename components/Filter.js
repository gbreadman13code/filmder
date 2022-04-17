import { StyleSheet, Text, View, SafeAreaView, Switch, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'

const Filter = ({ route, navigation }) => {

    const [isAdultEnabled, setIsAdultEnabled] = useState(false)
    const [fromYearInput, setFromYearInput] = useState(1)
    const [toYearInput, setToYearInput] = useState(3000)
    const [whichGenre, setWhichGenre] = useState('')
    const [allFilters, setAllFilter] = useState({
        genreId: '',
        fromYear: '',
        toYear: '',
        withAdultFilms: ''
    })
    const [isOldFilter, setIsOldFilter] = useState(false)
    const [oldFilter, setOldFilter] = useState({id: '', name: ''})

    const genreList = [
        { id: 28, name: "боевик" },
        { id: 12, name: "приключения" },
        { id: 16, name: "мультфильм" },
        { id: 35, name: "комедия" },
        { id: 80, name: "криминал" },
        { id: 99, name: "документальный" },
        { id: 18, name: "драма" },
        { id: 10751, name: "семейный" },
        { id: 14, name: "фэнтези" },
        { id: 36, name: "история" },
        { id: 27, name: "ужасы" },
        { id: 10402, name: "музыка" },
        { id: 9648, name: "детектив" },
        { id: 10749, name: "мелодрама" },
        { id: 878, name: "фантастика" },
        { id: 10770, name: "телевизионный фильм" },
        { id: 53, name: "триллер" },
        { id: 10752, name: "военный" },
        { id: 37, name: "вестерн" }
    ]
    const genreNameList = genreList.map(item => item.name)

    const changeSwitch = () => {
        setIsAdultEnabled(!isAdultEnabled)
    }
    const allowFilters = () => {
        const genreID = genreList.find(item => item.name === whichGenre)
        setAllFilter({
            genreId: genreID.id,
            fromYear: fromYearInput,
            toYear: toYearInput,
            withAdultFilms: isAdultEnabled
        })
    }

    const genreName = genreList.find(item => item.id === oldFilter.genreId)

    useEffect(() => {
        if (route.params != undefined) {
            setIsOldFilter(true)
            setOldFilter(route.params.filters)
            const oldId = genreList.find(item => item.id === route.params.filters.genreId)
            setWhichGenre(oldId.name)
            console.log(oldFilter)
        }
    })

    useEffect(()=>{
        if (allFilters.genreId != '') {
            navigation.navigate('Main', { allFilters })
        }
    }, [allFilters])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.genreContainer}>
                <Text style={styles.text}>Жанр:</Text>
                <SelectDropdown
                    data={genreNameList}
                    onSelect={item => setWhichGenre(item)}
                    defaultValue={isOldFilter ? genreName.name : genreNameList[0]}
                    defaultButtonText={isOldFilter ? genreName.name : 'Выберите жанр'}
                />
            </View>
            <View style={styles.langContainer}>
                <Text style={styles.text}>Год:</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.langInputContainer}>
                        <TextInput
                            style={styles.langInput}
                            value={String(fromYearInput)}
                            onChangeText={text => setFromYearInput(text)}
                            autoComplete='off'
                        />
                    </View>
                    <View style={styles.langInputContainer}>
                        <Text style={styles.text}> - </Text>
                        <TextInput
                            style={styles.langInput}
                            value={String(toYearInput)}
                            onChangeText={text => setToYearInput(text)}
                            autoComplete='off'
                        />
                    </View>
                </View>
            </View>
            <View style={styles.isAdultContainer}>
                <Text style={styles.text}>Для взрослых:</Text>
                <Switch
                    onValueChange={changeSwitch}
                    value={isAdultEnabled}
                />
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity onPress={allowFilters} style={styles.addFilterButton}>
                    <Text style={styles.buttonText}>ПРИМЕНИТЬ ФИЛЬТРЫ</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Filter

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black'
    },
    text: {
        color: '#fff',
        fontSize: 35
    },
    genreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    isAdultContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    langContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    langInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    langInput: {
        backgroundColor: 'white',
        fontSize: 30,
        width: 80,
        textAlign: 'center'
    },
    addFilterButton: {
        backgroundColor: '#e0dd00',
        paddingHorizontal: 25,
        paddingVertical: 20
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})