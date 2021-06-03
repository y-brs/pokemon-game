import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDOANhWOJbzAK0BNW98ZSN7Qm2HH7qUoMo",
  authDomain: "pokemon-game-d5b8c.firebaseapp.com",
  databaseURL: "https://pokemon-game-d5b8c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-game-d5b8c",
  storageBucket: "pokemon-game-d5b8c.appspot.com",
  messagingSenderId: "723494431621",
  appId: "1:723494431621:web:53bce4180b7fe4808bf2ec"
};

firebase.initializeApp(firebaseConfig);

class Firebase {
	constructor() {
		this.fire = firebase;
		this.database = this.fire.database();
	}

	getPokemonSocket = (cb) => {
		this.database.ref('pokemons').on('value', (snapshot) => {
			cb(snapshot.val());
		})
	}

	offPokemonSocket = () => {
		this.database.ref('pokemons').off();
	}

	getPokemonsOnce = async () => {
		return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
	}

	postPokemon = (key, pokemon) => {
		this.database.ref(`pokemons/${key}`).set(pokemon);
	}

	addPokemon = (data, cb) => {
		const newKey = this.database.ref().child('pokemons').push().key;
		this.database.ref('pokemons/' + newKey).set(data).then(() => cb());
	}
}

export default Firebase;