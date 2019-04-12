# Ribon Pokédex App

This web project was proposed by [Ribon](https://home.ribon.io/) for its admission process.
The candidates were asked to develop a pokéex web application with a React frontend that will consume a Ruby on Rails API.
The API will seed its database with the first 151 pokémon using data from [PokeApi](https://pokeapi.co/docs/v2.html).

## Functionality

The main screen will list all pokémon in the database, displaying little information (only its name, number and sprite). Clicking on a pokémon will fetch its details (types and evolution chain). It will be possible to filter the pokémon in display by a text input.

# How to run

### Backend

-   Install gems & run rails server:
    -   `bundle install`
    -   `rails s`

### Frontend

-   Install packages & run webpack:
    -   `npm i`
    -   `npm start`

# Development progress

-   [x] Create repo
-   [x] Write readme
-   [ ] Finish interface
-   [ ] Implement redux & redux-thunk or redux-saga
-   [ ] Implement typescript
-   [ ] Add styled-components
-   [ ] Add frontend testing using jest
-   [ ] Add backend testing using some-ruby-tesing-gem?

# Api design

The application will consume the following restful routes:

`/ GET` - Retrieves all pokémon (name and sprite)\
`/ POST` - Creates a new pokémon, given all fields listed bellow.\
`/:id GET` - Retrieves details of a given pokémon (name, sprite, types, evolutions)\
`/:id DELETE` - Deletes a pokémon\
`/:id PUT/UPDATE` - Updates a pokémon given a hash contains some or all of its fields.

# Pokémon model schema
Each pokémon will have the following fields:\
- id: number(national pokédex number)\
- name: string\
- sprite_url: string\
- type_1: string (possibily create a type that will hold possible types?)\
- type_2: same as above\

