import { animeList } from "./animeList"

export const getRandomAnimes = (value, howMany) => {

    let currentAnimeList = [ ...animeList ]
    const randomAnimeList = []

    for (let i = 0; i < howMany; i ++ ) {
        // ToDo: Add getting random animes, not the first ones 
        const differentAnime = currentAnimeList.find( (anime) => anime.value !== value )
        const filteredAnimeList = currentAnimeList.filter((anime) => anime.value !== differentAnime.value )
        currentAnimeList = filteredAnimeList
        randomAnimeList.push(differentAnime)
    }
    
    return randomAnimeList
}

export const recommendAnime = (value) => { 

    const userGivenAnime = animeList.find((anime) => anime.value === value)

    if (userGivenAnime === undefined) {
        console.warn("value is incorrect!")
        return []
    }

    const sameGenreAnimeList = animeList.filter((anime) => anime.genre === userGivenAnime.genre && anime.value !== userGivenAnime.value).slice(0, 3)

    if (sameGenreAnimeList.length < 2) {

        const howManyToPick = 3 - sameGenreAnimeList.length
        const randomAnimeList = getRandomAnimes(value, howManyToPick)

        return [...sameGenreAnimeList, ...randomAnimeList ]
    }

    const animeMatches = sameGenreAnimeList

    return animeMatches
 }

 