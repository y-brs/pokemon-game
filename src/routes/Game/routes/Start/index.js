import {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {FireBaseContext} from '../../../../context/firebaseContext';
import {PokemonContext} from '../../../../context/pokemonContext';

import PokemonCard from '../../../../components/PokemonCard';

import s from './style.module.css';

const DATA = {
	"abilities" : [ "keen-eye", "tangled-feet", "big-pecks" ],
	"base_experience" : 122,
	"height" : 11,
	"id" : Math.floor(Math.random() * 1000),
	"img" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
	"name" : "pidgeotto",
	"stats" : {
		"attack" : 60,
		"defense" : 55,
		"hp" : 63,
		"special-attack" : 50,
		"special-defense" : 50,
		"speed" : 71
	},
	"type" : "flying",
	"values" : {
		"bottom" : 7,
		"left" : 5,
		"right" : 2,
		"top" : "A"
	}
};

const StartPage = () => {
	const history = useHistory();
	const firebase = useContext(FireBaseContext);
	const pokemonsContext = useContext(PokemonContext);

	const [pokemons, setPokemons] = useState({});

	const getPokemons = async () => {
		const response = await firebase.getPokemonsOnce();
		setPokemons(response);
	}

	useEffect(() => {
		firebase.getPokemonSocket((pokemons) => {
			setPokemons(pokemons);
		});

		return () => firebase.offPokemonSocket();
	}, []);

	const handleChangeSelected = (key) => {
		const pokemon = {...pokemons[key]};
		pokemonsContext.onSelectedPokemons(key, pokemon);
		setPokemons(prevState => ({
			...prevState,
			[key]: {
				...prevState[key],
				isSelected: !prevState[key].isSelected
			}
		}))
	}

	const handleAddPokemon = () => {
		const data = DATA;
		firebase.addPokemon(data, async () => {
			await getPokemons();
		});
	}

	const handleStartGameClick = () => {
		history.push('/game/board');
	}

	return (
		<>
			<div className={s.buttonWrap} align="center">
				<button onClick={handleAddPokemon} className={s.buttonNew}>Add new 🐥</button>
				<button onClick={handleStartGameClick} className={s.buttonStart} disabled={Object.keys(pokemonsContext.pokemons).length < 5}>Start game 🚀</button>
			</div>
			<div className={s.flex}>
				{
					Object.entries(pokemons).map(([key, {name, img, id, type, values, isSelected}]) => <PokemonCard
						className={s.card}
						key={key}
						id={id}
						name={name}
						img={img}
						type={type}
						values={values}
						isActive={true}
						isSelected = {isSelected}
						handleChangeSelected={() => {
							if (Object.keys(pokemonsContext.pokemons).length < 5 || isSelected) {
								handleChangeSelected(key);
							}

						}}
					/>)
				}
			</div>
		</>
	)
}

export default StartPage;