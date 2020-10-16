const { Router } = require("express");
const router = new Router();
const Pokemon = require("../models/Pokemon.model");
const Session = require("../models/Session.model");
const User = require("../models/User.model");
// const fileuploader = require("../configs/cloudinary-setup");

/**  ============================
 *          create a new pokemon   Router  :
        if thepokemon exists, the pokemon id added to the user , else
        a new pokemon is created and the pokemon id added to the user.
 *   ============================
// */
// router.put("/new", fileUploader.single("pokeImage"), (req, res) => {
//   console.log(" requested route params : /pokemons/new ", req.params);
//   console.log(" requested route body: : /pokemons/new ", req.body);
//   const { name, image, pokemontype, pokedexnum, height, weight } = req.body;
//   console.log(" requested route headers:: ", req.headers.accesstoken);
//   const accesstoken = req.headers.accesstoken;

//   // const { accesstoken } = req.params;
//   pokemonAdded = {};
//   Pokemon.findOne({ pokedexnum })
//     .then((pokemon) => {
//       if (!pokemon) {
//         Pokemon.create({
//           name,
//           image,
//           pokemontype,
//           pokedexnum,
//           height,
//           weight,
//         }).then((pokemonfromDB) => {
//           // return res.status(200).json({ pokemonfromDB});
//           console.log(" pokemon created successfully", pokemonfromDB);
//           pokemonAdded = pokemonfromDB;
//         });
//       } else {
//         pokemonAdded = pokemon;
//       }
//       Session.findById({ _id: accesstoken })
//         .populate("userId")
//         .then((SessionfromDB) => {
//           console.log(" session for the access toke: ", SessionfromDB);
//           User.findByIdAndUpdate(
//             { _id: SessionfromDB.userId._id },
//             { $push: { pokemons: { pokemonId: pokemonAdded._id } } }
//           ).then((userfromDB) => {
//             return res.status(200).json({
//               message: "Pokemon added to your list ",
//               userfromDB,
//               pokemon,
//             });
//           });
//         });
//     })
//     .catch((err) => {
//       console.log(" Error while getting data from DB: ", err);
//       return res.status(404).json({ error: err });
//     });
// });

router.put("/new", (req, res) => {
  console.log(" requested route params : /pokemons/new ", req.params);
  console.log(" requested route body: : /pokemons/new ", req.body);
  const { name, image, pokemontype, pokedexnum, height, weight } = req.body;
  console.log(" requested route headers:: ", req.headers.accesstoken);
  const accesstoken = req.headers.accesstoken;

  // const { accesstoken } = req.params;
  pokemonAdded = {};
  Pokemon.findOne({ pokedexnum })
    .then((pokemon) => {
      if (!pokemon) {
        Pokemon.create({
          name,
          image,
          pokemontype,
          pokedexnum,
          height,
          weight,
        }).then((pokemonfromDB) => {
          // return res.status(200).json({ pokemonfromDB});
          console.log(" pokemon created successfully", pokemonfromDB);
          pokemonAdded = pokemonfromDB;
        });
      } else {
        pokemonAdded = pokemon;
      }
      Session.findById({ _id: accesstoken })
        .populate("userId")
        .then((SessionfromDB) => {
          console.log(" session for the access toke: ", SessionfromDB);
          User.findByIdAndUpdate(
            { _id: SessionfromDB.userId._id },
            { $push: { pokemons: { pokemonId: pokemonAdded._id } } }
          ).then((userfromDB) => {
            return res
              .status(200)
              .json({
                message: "Pokemon added to your list ",
                userfromDB,
                pokemon,
              });
          });
        });
    })
    .catch((err) => {
      console.log(" Error while getting data from DB: ", err);
      return res.status(404).json({ error: err });
    });
});

/**  ============================
 *          list out all pokemons
 *   ============================
 */
router.get("/all", (req, res) => {
  console.log(" requested route: /pokemons/all ");

  Pokemon.find().then((allpokemons) => {
    if (allpokemons) {
      res.status(200).json(allpokemons);
    } else {
      res.status(200).json({ errorMessage: "There are no pokemons" });
    }
  });
});

/**  ============================
 *         user poemons  pokemons
 *   ============================
 */
router.get("/myPokemons", (req, res) => {
  console.log(" requested route: /pokemons/myPokemons ");
  console.log(" credentials: ", req.headers.accesstoken);
  const sessionID = req.headers.accesstoken;
  // ,  populate: { path: "pokemonId" },
  Session.findById({ _id: sessionID })

    .populate({
      path: "userId",
      model: "Users",
      populate: { path: "pokemons", model: "Pokemons" },
    })
    // .populate({                    path: "pokemons",
    // .populate: { path: "pokemonId",}, })

    .then((dataDB) => {
      console.log(dataDB);
      const { pokemons: mypokemons } = dataDB.userId;
      if (mypokemons) {
        res.status(200).json(mypokemons);
      } else {
        res.status(200).json({ errorMessage: "You have Zero pokemons " });
      }
      console.log(pokemonsInfo[0].pokemonId);
      // console.log(dataDB.userId.pokemons);
    })
    .catch((err) =>
      res.status(200).json({ errorMessage: "The sessin is not active " })
    );
});

/**  ============================
 *          delete pokemon
 *   ============================
 */
router.delete("/delete/:id", (req, res) => {
  console.log(" requested route: /pokemons/delete ", req.params);
  const { accesstoken, id } = req.params;
  return res.send(200).json({ errorMessage: "Delete operation is incomplete" });
});

/**** */
module.exports = router;
