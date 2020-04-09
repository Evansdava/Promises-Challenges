/*
 *******************************************************************************
 * INSTRUCTIONS:
 * Follow the steps below and answer the discusssion questions that follow.
 *
 * 1. Read over the code that follows. `makePromise` is a function that makes
 *    an API call and returns a Promise containing the result. Uncomment code
 *    block #1 and run the code. What happens? (HINT: You may need to run
 *    `npm init` first.)
 *
 * It printed 'bulbasaur'
 *
 * 2. Sometimes, when making API calls, we want to make a bunch of calls in
 *    parallel and don't care in what order they resolve. (In other words, they
 *    don't depend on each other.)
 *
 *    Uncomment code block #2 and run the code. What happens? What advantages
 *    does `Promise.all` give us when dealing with promises?
 *
 * All three api calls are made asynchronously, and the three results are
 * printed at about the same time. Promise.all lets us resolve several
 * promises at once, without waiting for one to complete for the next to run
 *
 * 3. Make another variable `location1Promise` and assign to it the result of
 *    calling `makePromise` with the URL `https://pokeapi.co/api/v2/location/1.
 *    Add it to the array passed to `Promise.all`, then print the name of the
 *    returned location inside the `.then()` callback.
 *
 *
 *******************************************************************************
 */

const request = require('request')

/**
 * Makes an API request and returns a Promise containing the result.
 * @param url The url to make an API request to.
 */
function makePromise (url) {
  return new Promise(function (resolve, reject) {
    request(url, function (err, response, body) {
      if (err) {
      // Deal with any errors from the API call
        return reject(err)
      } else {
        try {
          // If this works, then - success!! Return the parsed body.
          resolve(JSON.parse(body))
        } catch (err) {
          // Deal with any errors from parsing the response
          return reject(err)
        }
      }
    })
  })
}

// SWAPI no longer maintained, Pokeapi recommended instead
const pokemon1Promise = makePromise('https://pokeapi.co/api/v2/pokemon/1')
const pokemon2Promise = makePromise('https://pokeapi.co/api/v2/pokemon/2')
const pokemon3Promise = makePromise('https://pokeapi.co/api/v2/pokemon/3')
const location1Promise = makePromise('https://pokeapi.co/api/v2/location/1')

/* Uncomment me! #1 */
pokemon1Promise.then(function (pokemonResult) {
  console.log(`Resulting pokemon's name: ${pokemonResult.name}`)
}).catch(function (err) {
  console.log('Got an error!')
  console.log(err)
})

/* Uncomment me! #2 */
Promise.all([pokemon1Promise, pokemon2Promise,
  pokemon3Promise, location1Promise])
  .then(function (results) {
    for (let i = 0; i < 3; i++) {
      console.log(`Pokemon ${i + 1}'s name: ${results[i].name}`)
    }
    console.log(`Location 1's name: ${results[3].name}`)
  })
  .catch(function (err) {
    console.log('Got an error!')
    console.log(err)
  })
