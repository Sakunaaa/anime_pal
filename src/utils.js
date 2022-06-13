import { animeList } from './animeList';

const findRandomIndex = (array) => {
    // 1. Sprawdz jaki jest ostatni mozliwy index w tabicy i przypisz do zmiennej "max"
    const max = array.length - 1;
    const randomNumber = Math.round(Math.random() * max)
    
    return randomNumber
    // 2. Wylosuj liczbe pomiedzy "min" = 0, a "max"
    // 3. Zwroc liczbe
}

export const getRandomAnimes = (value, howMany) => {
	let currentAnimeList = [...animeList];
	const randomAnimeList = [];

	for (let i = 0; i < howMany; i++) {
        // ToDo: Fix bug when the same anime pops out
		const differentAnimes = currentAnimeList.filter(
			(anime) => anime.value !== value
		);
        const differentAnimeIndex = findRandomIndex(differentAnimes)
        const differentAnime = differentAnimes[differentAnimeIndex]
		const filteredAnimeList = currentAnimeList.filter(
			(anime) => anime.value !== differentAnime.value
		);
		currentAnimeList = filteredAnimeList;
		randomAnimeList.push(differentAnime);
	}

	return randomAnimeList;
};

// todo: look for similiarity in name
export const recommendAnime = (value) => {
	const userGivenAnime = animeList.find((anime) => anime.value === value);

	if (userGivenAnime === undefined) {
		console.warn('value is incorrect!');
		return [];
	}

	const sameGenreAnimeList = animeList
		.filter(
			(anime) =>
				anime.genre === userGivenAnime.genre &&
				anime.value !== userGivenAnime.value
		)
		.slice(0, 3);

	if (sameGenreAnimeList.length < 2) {
		const howManyToPick = 3 - sameGenreAnimeList.length;
		const randomAnimeList = getRandomAnimes(value, howManyToPick);

		return [...sameGenreAnimeList, ...randomAnimeList];
	}

	const animeMatches = sameGenreAnimeList;

	return animeMatches;
};
