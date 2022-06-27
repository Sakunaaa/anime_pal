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

	let animeMatches = [];

	// Chcemy znalezc wszystkie anime, ktorych tytul zawiera podane value
	const similarNameAnimeList = animeList
		.filter(
			(anime) =>
				anime.text.toLowerCase().includes(userGivenAnime.text.toLowerCase()) &&
				anime.value !== userGivenAnime.value
		)
		.slice(0, HOW_MANY_TO_PICK)
		.map((anime) => ({
			...anime,
			match: 'same_name',
		}));

	animeMatches = [...similarNameAnimeList];
	if (animeMatches.length === HOW_MANY_TO_PICK) {
		return animeMatches;
	}

	const currentHowManyToPick = HOW_MANY_TO_PICK - animeMatches.length;
	const sameGenreAnimeList = animeList
		.filter((anime) => {
			const isSameGenre = anime.genre === userGivenAnime.genre
			const isNotGivenValue = anime.value !== userGivenAnime.value
			const isNotAlreadyMatched = animeMatches.includes((currentAnime) => currentAnime.value === anime.value)
			return (
				isSameGenre &&
				isNotGivenValue && 
				isNotAlreadyMatched
			);
		})
		.slice(0, currentHowManyToPick)
		.map((anime) => ({
			...anime,
			match: 'same_genre',
		}));

	animeMatches = [...animeMatches, ...sameGenreAnimeList];
	if (animeMatches.length === HOW_MANY_TO_PICK) {
		return animeMatches;
	}

	const currentHowManyToPick2 = HOW_MANY_TO_PICK - animeMatches.length;
	const randomAnimeList = getRandomAnimesFromDifferentGenre(
		userGivenAnime.genre,
		currentHowManyToPick2
	).map((anime) => ({ ...anime, match: 'random' }));

	animeMatches = [...animeMatches, ...randomAnimeList];

	return animeMatches;
};
