const URL = 'https://pokeapi.co/api/v2/';
window.onload = async function(){
    const pokemons = await getAllPokemons();
    const list = document.getElementById('pokemon-list');
    for (let pokemon of pokemons){
        const pokemonItem = document.createElement('li');
        pokemonItem.innerText = pokemon.name;
        
        //Boto afegir al equip
        const addButton = document.createElement('button');
        addButton.innerText = 'Afegir al equip';
        addButton.onclick = function(){
            afegirAlEquip(pokemon);
        };
        pokemonItem.appendChild(addButton);
        //onclick
        pokemonItem.onclick = async function() {
            const ID = getPositionPokemon(pokemon.name, pokemons);
            let IDSpan = this.querySelector('.ID-span'); //this = pokemonItem i querySelector busca elID-span dins el pokemonItem
            if (!IDSpan) {                               //si no té span el creo
                IDSpan = document.createElement('span');
                IDSpan.className = 'ID-span';
                IDSpan.style.display = 'block';          // nova linea
                this.appendChild(IDSpan);
            }
            const tipos = await getPokemonType(pokemon.name); 
            let typeSpan = this.querySelector('.type-span'); 
            if (!typeSpan) {  
                typeSpan = document.createElement('span');
                typeSpan.className = 'type-span'; 
                typeSpan.style.display = 'block'; 
                this.appendChild(typeSpan); 
            }
            const imatgeUrl = await getPokemonImage(pokemon.name);
            let img = this.querySelector('.pokemon-img'); 
            if (!img) {
                img = document.createElement('img');
                img.className = 'pokemon-img';
                img.style.display = 'block';
                this.appendChild(img);
            }
            //quan torno a clicar, s'oculta la informació
            if (IDSpan.style.display === 'none') { //si està ocult, mostro info
                IDSpan.style.display = 'block';
                typeSpan.style.display = 'block'; 
                img.style.display = 'block';
            } else {                               //si està visible, oculto info
                IDSpan.style.display = 'none';
                typeSpan.style.display = 'none';
                img.style.display = 'none'; 
            }
            IDSpan.innerText = `ID: ${ID}`;
            typeSpan.innerText = `Type: ${tipos}`;
            img.src = imatgeUrl;
            
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
    const imatge = details.sprites; //sprites és un objecte que conté la imatge
    const url = imatge.front_default; // imatge està a front_default
    return url;
}
async function searchPokemon(name){
    try{ //si no troba el pokemon, retorna null
    const response = await fetch(`${URL}pokemon/${name}`);
    if (!response.ok) throw new Error('Not found');
    const data = await response.json();
    return data;
    }catch(error){
        return null;
    }

}
async function searchPokemonByName(event){
    event.preventDefault(); // evito que el formulari s'envii
    const input = document.getElementById('pokemon-input');
    const busqueda = document.getElementById('busqueda');
    const pokemonName = input.value;
    const pokemon = await searchPokemon(pokemonName);
    if (pokemon){ //si existeix
        busqueda.innerHTML = ''; // netejo contingut anterior busca't
        let tipos = '';
        for (let i = 0; i < pokemon.types.length; i++) {
            tipos += pokemon.types[i].type.name;
            if (i < pokemon.types.length - 1) {
                tipos += ' ';
            }
        }
        busqueda.innerText = `ID: ${pokemon.id} Type: ${tipos}`;
        const img = document.createElement('img');
        img.className = 'imagen-search';
        img.src = pokemon.sprites.other['official-artwork'].front_default;
        busqueda.appendChild(img);
    } else {
        alert('Pokemon no trobat');
    }
    return busqueda.innerText;
}
function afegirAlEquip(pokemon) {
    if (equipo.length > 5) {
        alert('Equip ple');
        return;
    } //sino, afegim el pokemon a l'equip
    equipo.push(pokemon);
    updateEquipList();
}

function updateEquipList() {
    const equipList = document.getElementById('equip-list');
    equipList.innerHTML = ''; // Limpiar la lista anterior
    for (let pokemon of equip) {
        const pokemonItem = document.createElement('li');
        pokemonItem.innerText = pokemon.name;
        equipList.appendChild(pokemonItem);
    }
}