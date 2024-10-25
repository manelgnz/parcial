const URL = 'https://pokeapi.co/api/v2/';
window.onload = async function(){
    const pokemons = await getAllPokemons();
    const list = document.getElementById('pokemon-list');
    for (pokemon of pokemons){
        const pokemonItem = document.createElement('li');
        pokemonItem.innerText = pokemon.name; //probar .textContext
        list.appendChild(pokemonItem);
    }
}

async function getAllPokemons(){
    const response = await fetch(`${URL}pokemon/?limit=151`);
    const data = await response.json();
    const pokemonList = data.results;
    return pokemonList;
}
async function getNamePokemon(name){
    const pokemons = await getAllPokemons();
    const pokemon = pokemons.find(pokemon => pokemon.name === name);
    return pokemon.name;
}