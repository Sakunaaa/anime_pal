import { animeList } from './animeList';
import { recommendAnime } from './utils';
import { useState } from 'react';
import { Card } from './Card';
import { GridList, Main, Center } from './styles';

function App() {
	const [recommendedAnimeList, setRecommendedAnimeList] = useState([]);
	const [givenAnime, setGivenAnime] = useState();
	const submitHandler = (e) => {
		const results = recommendAnime(givenAnime);
		setRecommendedAnimeList(results);
		e.preventDefault();
	};

	return (
		<Main>
			<form onSubmit={submitHandler}>
				<Center>
					<input
						onChange={(e) => setGivenAnime(e.target.value)}
						placeholder="Enter title..."
						list="ice-cream-flavors"
					/>

					<button type="submit">Search</button>

					<datalist id="ice-cream-flavors">
						{animeList.map((anime) => (
							<option value={anime.value}>{anime.text}</option>
						))}
					</datalist>
				</Center>
			</form>
			<GridList>
				{recommendedAnimeList.map((anime) => { 
					return (
						<li>
							<Card
								title={anime.text}
								description={anime.description}
								imageSrc={anime.image}
								isHighlighted={anime.match === "same_genre" || anime.match === "same_name"}
							/>
						</li>
					)
				})}
			</GridList>
		</Main>
	);
}

export default App;
