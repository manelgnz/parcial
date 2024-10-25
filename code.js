const URL = 'https://pokeapi.co/api/v2/';
window.onload = async function(){
    const pokemons = await getAllPokemons();
    const list = document.getElementById('pokemon-list');
    for (let pokemon of pokemons){
        const pokemonItem = document.createElement('li');
        pokemonItem.innerText = pokemon.name;
        
        //onclick
        pokemonItem.onclick = async function() {
            const position = getPositionPokemon(pokemon.name, pokemons);
            let positionSpan = pokemonItem.querySelector('.position-span');
            if (!positionSpan) {
                positionSpan = document.createElement('span');
                positionSpan.className = 'position-span';
                positionSpan.style.display = 'block'; 
                this.appendChild(positionSpan);
            }
            positionSpan.innerText = `ID: ${position}`;
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
