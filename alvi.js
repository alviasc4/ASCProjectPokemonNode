const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pokemons = {
    pikachu: new Pokemon("Pikachu", 100, "electric", null, { thunderbolt: "thunderbolt", tackle: "tackle" }),
    charmander: new Pokemon("Charmander", 100, "fire", null, { ember: "ember", tackle: "tackle" }),
    squirtle: new Pokemon("Squirtle", 100, "water", null, { ember: "watergun", tackle: "tackle" }),

}

function Pokemon(name, health, type1, type2, attacks) {
    this.name = name
    this.health = health
    this.type1 = type1
    this.type2 = type2
    this.attacks = attacks

    this.allPokemonAttacks = {
        thunderbolt: { damage: 15, hitrate: .8, type: "electric" },
        ember: { damage: 15, hitrate: .8, type: "fire" },
        watergun: { damage: 15, hitrate: .8, type: "water" },
        tackle: { damage: 9, hitrate: .98, type: "normal" },
    }

    this.calculateDamage = function (baseAttack, hitrate) {
        const generatedForHitRate = Math.random()
        if (generatedForHitRate > hitrate) return 0;
        const damage = Math.round(Math.random() * (baseAttack - 5) + 5)
        return damage
    }
    this.attackPokemon = function (attackedPokemon, attackName) {
        let damage = this.calculateDamage(this.allPokemonAttacks[attackName].damage, this.allPokemonAttacks[attackName].hitrate)
        effectivenessMutliplier = this.calculateTypeMultiplier(this.allPokemonAttacks[attackName].type, attackedPokemon.type1)
        damage = damage * effectivenessMutliplier
        if (effectivenessMutliplier > 1) console.log('OMG! This is a super effective attack!')
        attackedPokemon.health = attackedPokemon.health - damage
    }
    this.calculateTypeMultiplier = function (typeAttack, typeAttackedPokemon) {
        const effectiveMap = { water: "fire", electric: "water" }
        for (effectiveElement of Object.keys(effectiveMap)) {
            if (typeAttack === effectiveElement && typeAttackedPokemon === effectiveMap[effectiveElement]) return 1.5
        }
        return 1
    }

}

function battle(pokemon1, pokemon2) {

    aliveCheck(pokemon1, pokemon2)

    rl.question(`please choose an attack for ${pokemon1.name}, you can choose: ${Object.keys(pokemon1.attacks)}\n`, function (userInputLine) {
        if (userInputLine in pokemon1.attacks) {
            resolveAttacks(pokemon1, pokemon2, userInputLine)


            battle(p1, p2)
        }
        else {
            console.log(`You typed ${userInputLine}, which is not a valid attack. Try again\n`)


            battle(p1, p2)
        }
    })
}

function aliveCheck(pokemon1, pokemon2) {
    if (pokemon1.health < 1) {
        console.log(pokemon2.name + " wins!\n")
        rl.close()
        process.exit()
    }
    if (pokemon2.health < 1) {
        console.log(pokemon1.name + " wins!\n")
        rl.close()
        process.exit()
    }
}

function resolveAttacks(pokemon1, pokemon2, userInputLine) {
    pokemon1.attackPokemon(pokemon2, pokemon1.attacks[userInputLine])
    console.log(`${pokemon1.name} uses ${userInputLine}!`)
    pokemon2.attackPokemon(pokemon1, pokemon2.attacks["tackle"])
    console.log(`${pokemon2.name} uses tackle!`)
    console.log(`${pokemon1.name}: ${pokemon1.health} hp ----- ${pokemon2.name}: ${pokemon2.health} hp`)
}


let p1 = pokemons.pikachu
let p2 = pokemons.squirtle
battle(p1, p2)