// models/Pokemon.model.js

const {Schema,model} = require('mongoose');

const schemaPokemon = new  Schema(
    {
        name: {
            type:String,
            required:true,
        },
        image: {
            type:String,
             match: /^https?:\/\//,
        },
        pokemontype: {
            type:String,
            enum:["grass","water","normal","fire","electric"]
        },
        pokedexnum:{
            type:Number,
            required:true,
        },
        height:{
            type:String,
            required:true,
        },
        weight:{
            type:String,
            required:true,
        }
    },
    {  timestamps:true, },
);

module.exports = model("Pokemons",schemaPokemon);