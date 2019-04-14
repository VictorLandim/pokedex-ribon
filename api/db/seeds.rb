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
    require 'json'
    require 'open-uri'
    require 'parallel'

    attr_reader :monster_number

    def initialize monster_number
        @monster_number = monster_number

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
    
    # builds evolution chain array given a root chain
    def get_evo_recur chain, evolution_array, stage
        # pushes current monsters
        evolution_array << { 
            "name" => chain["species"]["name"], 
            "url" => chain["species"]["url"],
            "number" => get_num_from_url(chain["species"]["url"]),
            "sprite" => "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/#{get_num_from_url(chain["species"]["url"])}.png/",
            "stage" => stage
        }
    
        return
        
        # chain data format:
        # chain = {
        #   evolution_details => [...],
        #   evolves_to => [{...}, {...}],
        #   species: { name: ..., ... }
        # }
        
        # chain is an array that holds evolutions of the same stage
        chain["evolves_to"].each_with_index do |e, i|
            get_evo_recur(e, evolution_array, stage + 1)
        end 
    
        # # monster with no evolutions!
        # if chain["evolves_to"].empty?
        #     puts 'chain ended!'
        #     evolution_array 
        # else
        #     # monster is final evolution
        #     puts 'the chain continues'
        #     get_evo_recur chain["evolves_to"], evolution_array
        # end
    end
    
    def fetch_monster_data
        # parallalize data fetching
        monster_data = Parallel.map((1..@monster_number)) do |n|
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
    
            evolution_chain = get_evo_recur(evolutions["chain"], [], 0)
    
            response = {
                :name => name,
                :number => number,
                :sprite => sprite,
                :type_1 => type_1,
                :type_2 => type_2,
                :evolution_chain => evolution_chain 
            }
    
        end
    
        puts '> Pokémon data fetched.'
    
        monster_data
    end
    
    def insert_monster_data monster_data
        puts monster_data.length
        monster_data.each do |m|
            Monster.create(m);
            print "> Created pokémon ##{m[:number]}.\r"
            $stdout.flush
        end
    
        puts '> Pokémon data inseted into de db.'
    end
end

Seeder.new 151