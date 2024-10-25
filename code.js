const URL = 'https://pokeapi.co/api/v2/';
window.onload = async function(){
    const pokemons = await getAllPokemons();
    const list = document.getElementById('pokemon-list');
    for (let pokemon of pokemons){
        const pokemonItem = document.createElement('li');
        pokemonItem.innerText = pokemon.name;
        
        //onclick
        pokemonItem.onclick = async function() {
            const ID = getPositionPokemon(pokemon.name, pokemons);
            let IDSpan = pokemonItem.querySelector('.ID-span');
            if (!IDSpan) {
                IDSpan = document.createElement('span');
                IDSpan.className = 'ID-span';
                IDSpan.style.display = 'block'; 
                this.appendChild(IDSpan);
            }
            const tipos = await getPokemonType(pokemon.name); 
            let typeSpan = this.querySelector('.type-span'); // this = pokemonItem
            if (!typeSpan) {  /// si no existeix el span, el creo
                typeSpan = document.createElement('span');
                typeSpan.className = 'type-span'; 
                typeSpan.style.display = 'block'; // per a que es mostri en una nova línia
                this.appendChild(typeSpan); 
            }
            IDSpan.innerText = `ID: ${ID}`;
            typeSpan.innerText = `Type: ${tipos}`;

            
        };

        list.appendChild(pokemonItem);
    }
}

async function getAllPokemons(){
    const response = await fetch(`${URL}pokemon/?limit=151`);
    const data = await response.json();
    const pokemonList = data.results;
    return pokemonList;
}
function getPositionPokemon(name, pokemons){
    for (let i = 0; i < pokemons.length; i++){
        if (pokemons[i].name === name){
            return i;
        }
    }
}

async function getPokemonDetails(name) {
    const response = await fetch(`${URL}pokemon/${name}`);
    const data = await response.json();
    return data;
}
async function getPokemonType(name) {
    const details = await getPokemonDetails(name);
    let types = '';
    for (let i = 0; i < details.types.length; i++) {
        types += details.types[i].type.name + " "; // afegim el tipus a la cadena amb un espai
    }
    return types;
}

async function getPokemonImage(name){
    const details = await getPokemonDetails(name);
    return details.sprites.front_default;
}