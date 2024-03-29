# Ribon Pokédex App

![alt text](ribon-pokedex.png 'Ribon Pokédex')
![alt text](ribon-pokedex-1.png 'Ribon Pokédex')

This web project was proposed by [Ribon](https://home.ribon.io/) for its admission process.
The candidates were asked to develop a pokédex web application with a React frontend that will consume a Ruby on Rails API.
The API will seed its database with the first 151 pokémon using data from [PokeApi](https://pokeapi.co/docs/v2.html).

## Functionality

The main screen will list all pokémon in the database, displaying little information (only its name, number and sprite). Clicking on a pokémon will fetch its details (types and evolutions). It will be possible to filter the pokémon in display by a text input.

# How to run

Clone the repo, then:

### Backend

-   Install gems & run rails server:
    -   `cd api`
    -   `bundle install`
    -   `rails db:drop && rails db:migrate rails db:seed && rails s`

### Frontend

-   Install packages & run webpack:
    -   `cd ui`
    -   `npm i`
    -   `PORT=3001 npm start`
    -   visit `localhost:3001`

# Development progress

## Misc

-   [x] Create repo
-   [x] Write readme
-   [x] Plan project

## Frontend

-   [x] Mockup ui
-   [x] Pokémon listing
-   [x] Name & number filtering
-   [x] Selected/unselected cell state
-   [x] Pokémon details
-   [x] Finish ui

## Backend

-   [x] Setup basic CRUD
-   [x] Setup CORS
-   [x] Design pokemon schema
-   [x] Create seeding module
-   [ ] Add backend testing using some-ruby-tesing-gem?

## Bonus

-   [x] Sass with node-sass for styling
-   [x] Fancy UI effects
-   [x] Implement prop-types
-   [x] Implement redux & redux-saga
-   [ ] Evolution chain field should contain all evolutions
-   [ ] Make ui responsive
-   [ ] Implement typescript
-   [ ] Add frontend testing using jest
-   [ ] Dockerize API app
-   [ ] Authentication/Authorization
-   [ ] Migrate to a "real" database (mysql, postgres)
-   [ ] Increase the number of fields in the pokemon model

# Api design

The application consists of a basic CRUD structure, composed by the following restful routes:

`/ GET` - Retrieves all pokémon (name and sprite)\
`/ POST` - Creates a new pokémon, given all fields listed bellow.\
`/:id GET` - Retrieves details of a given pokémon (name, sprite, types, evolutions)\
`/:id DELETE` - Deletes a pokémon\
`/:id PUT/UPDATE` - Updates a pokémon given a hash containing some or all of its fields.

# Pokémon model schema

Each pokémon will have the following fields:

-   id: unique identifier
-   number: number(national pokédex number)
-   name: string
-   sprite: string
-   type_1: string
-   type_2: string
-   evolution_chain: array of objects

