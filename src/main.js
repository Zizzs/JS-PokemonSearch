import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pokemon } from './js/pokemon';

$(document).ready(function () {
    $("#pokemonByName").submit(function(event) {
        event.preventDefault();
        let name = $("#pokemonName").val();
        let pokemon = new Pokemon();
        let promise = pokemon.getPokemonByName(name);

        promise.then(function(response) {
            let body = JSON.parse(response);
            let img = new Image();
            img.src = body.sprites.front_default;
            document.getElementById("pokemonOutput").src = img.src;
        })
    });

    $("#randomPokemon").submit(function(event) {
        event.preventDefault();
        let pokemon = new Pokemon();
        let num = pokemon.getRandomArbitrary(802);
        let promise = pokemon.getPokemonByName(num);

        promise.then(function(response) {
            let body = JSON.parse(response);
            let img = new Image();
            img.src = body.sprites.front_default;
            let pokemonName = body.forms[0].name;
            document.getElementById("pokemonOutput").src = img.src;
            console.log(pokemonName);
            $("#pokemonNameOutput").text(pokemonName);
        })
    });

    $("#typePokemon").submit(function(event) {
        event.preventDefault();
        let type = $("#pokemonType").val();
        let pokemon = new Pokemon();
        pokemon.getPokemonByType(type)
            .then(function(response){
            let body = JSON.parse(response);
            let pokemonList = body.pokemon;
            let pokemon = new Pokemon();
            let length = pokemonList.length;
            let num = pokemon.getRandomArbitrary(length);
            let newPokemon = pokemonList[num + 1];
            let name = newPokemon.pokemon.name
            return pokemon.getPokemonByName(name);
        })
        .then(function(response) {
            let body = JSON.parse(response);
            let img = new Image();
            img.src = body.sprites.front_default;
            let pokemonName = body.forms[0].name;
            document.getElementById("pokemonOutput").src = img.src;
            console.log(pokemonName);
            $("#pokemonNameOutput").text(pokemonName);
        });     
    });
});

