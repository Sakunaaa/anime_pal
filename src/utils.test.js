import { recommendAnime, getRandomAnimes } from "./utils";
import {animeList } from './animeList'

const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
}

const value = "naruto_shippuuden"
const recommended = recommendAnime(value)
const narutoItem = animeList.find(a => a.value === value) 

it("returns array of animes", () => {
    expect(Array.isArray(recommended)).toBe(true)
})

it("returns anime of the same genre", () => {
    expect(recommended.find(anime => anime.genre === narutoItem.genre && anime.value !== narutoItem.value)).toBeDefined()
})

const givenLength = 3
const givenValue = "bleach"
const randomAnimes = getRandomAnimes(givenValue, givenLength)

it("getRandomAnime returns array of 3 elements", () => {
    expect(Array.isArray(randomAnimes)).toBe(true)
    expect(randomAnimes.length).toBe(givenLength)
})

it("getRandomAnime returns array of 3 elements other than given anime", () => {
    const isRandomAnimesDifferentThanGivenValue = randomAnimes.find(anime => anime.value === givenValue) === undefined
    expect(isRandomAnimesDifferentThanGivenValue).toBe(true)
})

it("getRandomAnime returns array of 3 elements other than each other", () => {
    const animeNames = randomAnimes.map(anime => anime.value)
    const isDuplicated = hasDuplicates(animeNames)
    expect(isDuplicated).toBe(false)
})
