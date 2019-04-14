# Ribon Pokédex App

![alt text](ribon-pokedex.png 'Ribon Pokédex')

This web project was proposed by [Ribon](https://home.ribon.io/) for its admission process.
The candidates were asked to develop a pokédex web application with a React frontend that will consume a Ruby on Rails API.
The API will seed its database with the first 151 pokémon using data from [PokeApi](https://pokeapi.co/docs/v2.html).

## Functionality

The main screen will list all pokémon in the database, displaying little information (only its name, number and sprite). Clicking on a pokémon will fetch its details (types and evolution chain). It will be possible to filter the pokémon in display by a text input.

# How to run

### Backend

-   Install gems & run rails server:
    -   `bundle install`
    -   `rails db:drop && rails db:migrate rails db:seed && rails s`

### Frontend

-   Install packages & run webpack:
    -   `npm i`
    -   `npm start`
    -   visit `localhost:3000`

# Development progress

## Misc

-   [x] Create repo
-   [x] Write readme

## Frontend

-   [x] Pokémon listing
-   [x] Name & number filtering
-   [x] Selected/unselected cell state
-   [x] Implement prop-types
-   [ ] Pokémon details
-   [ ] Implement redux & redux-thunk or redux-saga
-   [ ] Finish interface

## Backend

-   [x] Setup basic CRUD api
-   [x] Setup CORS
-   [ ] Add backend testing using some-ruby-tesing-gem?

## Database

-   [x] Create pokemon schema

## Bonus

-   [ ] Make interface responsive
-   [ ] Implement typescript
-   [ ] Add frontend testing using jest
-   [ ] Dockerize API app
-   [ ] Authentication/Authorization
-   [ ] Migrate to a "real" database (mysql, postgres)
-   [ ] Increase the number of fields in the pokemon model
-   [ ] Evolution chain field should contain all evolutions

# Api design

The application consists of a basic CRUD structure, composed by the following restful routes:

`/ GET` - Retrieves all pokémon (name and sprite)\
`/ POST` - Creates a new pokémon, given all fields listed bellow.\
`/:id GET` - Retrieves details of a given pokémon (name, sprite, types, evolutions)\
`/:id DELETE` - Deletes a pokémon\
`/:id PUT/UPDATE` - Updates a pokémon given a hash contains some or all of its fields.

# Pokémon model schema

Each pokémon will have the following fields:\

-   number: number(national pokédex number)\
-   name: string\
-   sprite: string\
-   type_1: string (possibily create a type that will hold possible types?)\
-   type_2: same as above\
-   evolution_chain: array of arrays

# References

[Rails status code symbols](http://billpatrianakos.me/blog/2013/10/13/list-of-rails-status-code-symbols/)
