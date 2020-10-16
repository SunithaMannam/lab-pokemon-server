const mongoose = require("mongoose");
const Pokemon = require("../models/Pokemon.model");
require("../configs/db.config");
 

let pokemons = [
{
      "pokedexnum": 86,
      "name": "Seel",
      "image": "http://www.serebii.net/pokemongo/pokemon/086.png",
      "pokemontype":  "water",
      "height": "1.09 m",
      "weight": "90.0 kg",   
    },
    {
      "pokedexnum": 1,
      "name": "Bulbasaur",
      "image": "http://www.serebii.net/pokemongo/pokemon/001.png",
      "pokemontype":  "grass",        
      "height": "0.71 m",
      "weight": "6.9 kg",
    },
    {
      "pokedexnum": 2,
      "name": "Ivysaur",
      "image": "http://www.serebii.net/pokemongo/pokemon/002.png",    
     "pokemontype":  "fire",         
      "height": "0.99 m",
      "weight": "13.0 kg",
    },
   
    {
      "pokedexnum": 3,
      "name": "Charizard",
      "image": "http://www.serebii.net/pokemongo/pokemon/003.png",
      "pokemontype":  "fire",        
      "height": "1.70 m",
      "weight": "90.5 kg",      
    },
 
   {
      "pokedexnum": 25,
      "name": "Pikachu",
      "image": "http://www.serebii.net/pokemongo/pokemon/025.png",
      "pokemontype":  "electric",     
      "height": "0.41 m",
      "weight": "6.0 kg",      
    },
     {
      "pokedexnum": 52,
      "name": "Meowth",
      "image": "http://www.serebii.net/pokemongo/pokemon/052.png",
      "pokemontype":  "normal",
      "height": "0.41 m",
      "weight": "4.2 kg",
 
    },
  ];

Pokemon.create(pokemons)
.then( resultfromDB => console.log( " pokemons are craeted in DB "))
.catch(err => console.log("Error while inserting pokemons into DB ",err))