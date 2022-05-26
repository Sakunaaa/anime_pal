import { animeList } from "./animeList";
import { recommendAnime } from "./utils";
console.log(recommendAnime("kuroko_no_basket"))
function App() {
	return (
		<div className="container">
			<input
        placeholder="Enter title..."
				list="ice-cream-flavors"
			/>

			<datalist id="ice-cream-flavors">
				{/* <option value="Chocolate" /> */}
        {animeList.map((anime) => <option value={anime.value}>{anime.text}</option>)}
			</datalist>
		</div>
	);
}

export default App;
