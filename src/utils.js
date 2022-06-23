import { animeList } from './animeList';

const findRandomIndex = (array) => {
	// 1. Sprawdz jaki jest ostatni mozliwy index w tabicy i przypisz do zmiennej "max"
	const max = array.length - 1;
	const randomNumber = Math.round(Math.random() * max);

	return randomNumber;
	// 2. Wylosuj liczbe pomiedzy "min" = 0, a "max"
	// 3. Zwroc liczbe
};

export const getRandomAnimesFromDifferentGenre = (genre, howMany) => {
	let currentAnimeList = [...animeList];
	const randomAnimeList = [];

	for (let i = 0; i < howMany; i++) {
		// ToDo: Fix bug when the same anime pops out
		const differentAnimes = currentAnimeList.filter(
			(anime) => anime.genre !== genre
		);
		const differentAnimeIndex = findRandomIndex(differentAnimes);
		const differentAnime = differentAnimes[differentAnimeIndex];
		const filteredAnimeList = currentAnimeList.filter(
			(anime) => anime.value !== differentAnime.value
		);
		currentAnimeList = filteredAnimeList;
		randomAnimeList.push(differentAnime);
	}

	return randomAnimeList;
};

const HOW_MANY_TO_PICK = 3;
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
		.slice(0, HOW_MANY_TO_PICK);

	if (sameGenreAnimeList.length < HOW_MANY_TO_PICK) {
		const howManyToPick = HOW_MANY_TO_PICK - sameGenreAnimeList.length;
		const randomAnimeList = getRandomAnimesFromDifferentGenre(
			userGivenAnime.genre,
			howManyToPick
		);

		return [
			...sameGenreAnimeList.map((anime) => ({ ...anime, match: 'same_genre' })),
			...randomAnimeList.map((anime) => ({ ...anime, match: 'random' })),
		];
		
	}

	return sameGenreAnimeList.map((anime) => ({ ...anime, match: 'same_genre' }));
};
