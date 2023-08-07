const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input__search');
const btnPrv = document.querySelector('.btn-prv');
const btnNext = document.querySelector('.btn-next');
let searchPokemon = 1;


const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}
    `); 

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
} 

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
    pokemonImg.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    inputSearch.value = '';
    searchPokemon = data.id;
    }else{
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
        pokemonImg.style.display = 'none';
        inputSearch.value = '';
    }
}

form.addEventListener('submit', (Event)=>{
    Event.preventDefault();

    renderPokemon(inputSearch.value.toLowerCase());
});


btnPrv.addEventListener('click', ()=>{
    if (searchPokemon > 1){
   searchPokemon -=1;
   renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', ()=>{
    searchPokemon ++;
    renderPokemon(searchPokemon);
 });

 renderPokemon(searchPokemon);
