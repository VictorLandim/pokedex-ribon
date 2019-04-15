# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# given an evolution chain,
# build evolution array recursively

# a chain hash contains the keys: 
# - evolution_details -> array
# - evolves_to -> array
# - species.name -> string

class Seeder
    require 'net/http'
    require 'net/https'
    require 'json'
    require 'open-uri'
    require 'parallel'
    require 'resolv-replace'

    attr_reader :monster_numbers

    def initialize monster_number
        @monster_numbers = monster_number

        insert_monster_data fetch_monster_data
    end

    private
    
    def get_num_from_url url
        # input:    https://pokeapi.co/api/v2/pokemon/555/
        # output:   555
        id = ''
    
        url = url.reverse
        start = 0
    
        start = 1 if url[0] == '/'
    
        (start...url.length).each do |l|
            break if url[l] == '/' 
            id << url[l]
        end
    
        id.reverse.to_i
    end

    def get_evo monster_name, chain
        if chain["evolves_to"].empty?
            return []
        end
        
        if chain["species"]["name"] == monster_name
            return chain["evolves_to"].map do |n|
                {
                    "name" => n["species"]["name"], 
                    "sprite" => "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/#{get_num_from_url(n["species"]["url"])}.png",
                }
            end
        else
            chain["evolves_to"].each do |n|
                if n["species"]["name"] == monster_name
                    return get_evo(monster_name, n)
                end
            end
        end

        return []
    end
    
    # builds evolution chain array given a root chain
    def get_evo_recur chain, evolution_array
        # pushes current monsters
        evolution_array << [{ 
            "name" => chain["species"]["name"], 
            "sprite" => "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/#{get_num_from_url(chain["species"]["url"])}.png",
        }]

        return evolution_array if chain["evolves_to"].empty?
    
        # chain data format:
        # chain = {
        #   evolution_details => [...],
        #   evolves_to => [{...}, {...}],
        #   species: { name: ..., ... }
        # }
        
        # chain is an array that holds evolutions of the same stage
        # evolution_array << chain["evolves_to"].map do |n|
        #     get_evo_recur(n, evolution_array)
        # end 
    
        return get_evo_recur chain["evolves_to"][0], evolution_array
        return evolution_array
    end
    
    def fetch_monster_data
        # parallalize data fetching
        # monster_data = (@monster_numbers).map do |n|
        monster_data = Parallel.map(@monster_numbers) do |n|
            # fetch monster info
            info_url = "https://pokeapi.co/api/v2/pokemon/#{n}"
            monster_info = JSON.parse(open(info_url).read)
    
            name = monster_info["name"]
            number = monster_info["id"]
            sprite = monster_info["sprites"]["front_default"]
    
            type_1 = nil
            type_2 = nil
    
            type_1 = monster_info["types"][0]["type"]["name"]
    
            # if monster has a second type, check type order,
            # otherwise it will have only one type
            if !monster_info["types"][1].nil?
                order_0 = monster_info["types"][0]["type"]["order"].to_i
                order_1 = monster_info["types"][1]["type"]["order"].to_i
    
                if order_0 > order_1
                    type_1 = monster_info["types"][0]["type"]["name"] 
                    type_2 = monster_info["types"][1]["type"]["name"] 
                else
                    type_1 = monster_info["types"][1]["type"]["name"] 
                    type_2 = monster_info["types"][0]["type"]["name"] 
                end
            else
                type_1 = monster_info["types"][0]["type"]["name"]
            end
    
            # getting the evolution chain is tricky
            # first we have to fetch the monster's species details
            # then, we fetch the monster's evolution details
            species_url = monster_info["species"]["url"]
            monster_species = JSON.parse(open(species_url).read)
    
            # this field will always be present
            evolution_chain_url = monster_species["evolution_chain"]["url"]
            evolutions = JSON.parse(open(evolution_chain_url).read)

            # evolution_chain = get_evo_recur(evolutions["chain"], [])
            evolution_chain = get_evo(name, evolutions["chain"])

            {
                :name => name,
                :number => number,
                :sprite => sprite,
                :type_1 => type_1,
                :type_2 => type_2,
                :evolution_chain => evolution_chain.to_json
            }
        end
    
        puts '> Pokémon data fetched.'
        monster_data
    end
    
    def insert_monster_data monster_data
        monster_data.each do |m|
            Monster.create(m);
            print "> Created pokémon ##{m[:number]}.\r"
            $stdout.flush
        end
    
        puts '> Pokémon data inseted into de db.'
    end
end

Seeder.new 1...151