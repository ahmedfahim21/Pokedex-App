const poke_container = document.getElementsByClassName('poke_container');

const colors = {
	fire: '#FF715B',
	grass: '#3DA35D',
	electric: '#F9CB40',
	water: '#7CC6FE',
	ground: '#A7A284',
	rock: '#596869',
	fairy: '#FF70A6',
	poison: '#8C5383',
	bug: '#BCED09',
	dragon: '#145c9e',
	psychic: '#D138BF',
	flying: '#8789C0',
	fighting: '#FF1F57',
	normal: '#7C9082',
    dark: '#0b516f',
    ghost: '#673582',
    ice:'#70D6FF',
    steel:'#B8CAE0'
};

//function for creating each pokemon card including all its information
async function createPokemonCard(pokemon){
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    const name =pokemon.name[0].toUpperCase()+pokemon.name.slice(1);
    const type=pokemon.types[0].type.name;
    
    if((pokemon.types).length >= 2){
        var sec_type=pokemon.types[1].type.name;
    }
    else{
        var sec_type="None";
    }
    
    //making the front side of card
    const pokeInnerHTML =
    `<div class="img_cont">
    <img class="img_container" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name} image">
    </div>
    <div class="info">
        <span class ="number">#${pokemon.id.toString().padStart(3,'0')}</span>
        <h3 class="name">${name}</h3>
        <small class="type1">Pri Type:  <span style="
        background-color: ${colors[type]};
        border-radius: 6px;
	    font-size: 12px;
	    padding: 3px 7px;
        ">${type}</span></small> <br>
        <small class="type2">Sec Type:  <span style="
        background-color: ${colors[sec_type]};
        border-radius: 6px;
	    font-size: 12px;
	    padding: 3px 7px;
        ">${sec_type}</span></small>     
    </div>`;

    pokemonEl.innerHTML = pokeInnerHTML;
    const color =colors[type];
    
    pokemonEl.style.borderColor=color;


    if(pokemon.id<10000){
    const url_sp= 'https://pokeapi.co/api/v2/pokemon-species/'+pokemon.id;
    const res_sp = await fetch(url_sp);
    const pokemon_sp = await res_sp.json();
    var pokemon_sp_fvt=pokemon_sp.flavor_text_entries[1].flavor_text;
    }
    else{
        var pokemon_sp_fvt="NO DATA AVAILABLE";
    }

    //  making the back side of card
    const pokeInnerHTML2 =
    `<div class="stats"> STATS:
        <p>${pokemon.stats[0].stat.name}:<div class="bar"></div>
        <div class="bar inner_bar" style="
        position: relative;
        top: 5px;
        margin-left:0;
        width: ${pokemon.stats[0].base_stat}px;
        height: 5px;
        background: red;
        z-index:1"></div></p>
        <p>${pokemon.stats[1].stat.name}:<div class="bar"></div>
        <div class="bar inner_bar" style="
        position: relative;
        top: 5px;
        margin-left:0;
        width: ${pokemon.stats[1].base_stat}px;
        height: 5px;
        background: blue;
        z-index:1"></div></p>
        <p>${pokemon.stats[2].stat.name}:<div class="bar"></div>
        <div class="bar inner_bar" style="
        position: relative;
        top: 5px;
        margin-left:0;
        width: ${pokemon.stats[2].base_stat}px;
        height: 5px;
        background: green;
        z-index:1"></div></p>
        <p>${pokemon.stats[3].stat.name}:<div class="bar"></div>
        <div class="bar inner_bar" style="
        position: relative;
        top: 5px;
        margin-left:0;
        width: ${pokemon.stats[3].base_stat}px;
        height: 5px;
        background: maroon;
        z-index:1"></div></p>
        <p>${pokemon.stats[4].stat.name}:<div class="bar"></div>
        <div class="bar inner_bar" style="
        position: relative;
        top: 5px;
        margin-left:0;
        width: ${pokemon.stats[4].base_stat}px;
        height: 5px;
        background: purple;
        z-index:1"></div></p>
        <p>${pokemon.stats[5].stat.name}:<div class="bar"></div>
        <div class="bar inner_bar" style="
        position: relative;
        top: 5px;
        margin-left:0;
        width: ${pokemon.stats[5].base_stat}px;
        height: 5px;
        background: pink;
        z-index:1"></div></p>
        DESCRIPTION:
        <p class="info">
        ${pokemon_sp_fvt}
        </p>
    </div>
    `;

    //event listeners to toggle front and back side
    pokemonEl.addEventListener('click', ()=>{
        pokemonEl.style.backgroundColor=color;
        pokemonEl.innerHTML=pokeInnerHTML2;
    })
    pokemonEl.addEventListener('mousemove', ()=>{
        pokemonEl.style.backgroundColor="rgba(255, 255, 255, .5)";
        pokemonEl.innerHTML=pokeInnerHTML;
        pokemonEl.style.borderColor=colors[type];
    })
    
    poke_container[0].appendChild(pokemonEl);

}


//function to fetch pokemons based on type filtering
var pok_types=document.getElementById('pok_types');
pok_types.addEventListener('change', async function(){
    poke_container[0].innerHTML="";
    var type_id= pok_types.value;
    if(type_id=="0"){
        fetchallPokemons();
    }
    else{
    getPokemonType(type_id);
    }

});

//function to fetch ALL pokemons
const fetchallPokemons =async()=>{
    const qurl='https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    const res = await fetch(qurl);
    const pokemons = await res.json();
    for(let i=0;i<=pokemons.results.length;i++){
        const url= pokemons.results[i].url;
        await getPokemons(url);
    }
}

//function to fetch url of individual pokemons 
const getPokemonType = async (type_id) =>{

    const url= 'https://pokeapi.co/api/v2/type/'+type_id;
    const res = await fetch(url);
    const pokemon = await res.json();
    for(let i=0;i<pokemon.pokemon.length;i++)
    {
        const url= pokemon.pokemon[i].pokemon.url;
        await getPokemons(url);
        
    }
}

//function to fetch data of individual pokemons
const getPokemons = async (url) =>{
    
    const res = await fetch(url);
    const pokemon = await res.json();
    
    createPokemonCard(pokemon);
}

