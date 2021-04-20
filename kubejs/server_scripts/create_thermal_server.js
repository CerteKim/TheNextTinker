// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

console.info('Hello, World! (You will see this line every time server resources reload)')

onEvent('recipes', event => {
	

	const genericOreCrushing = (oreName, crushedOreName, stoneType) => {
		if (stoneType == undefined) stoneType = 'minecraft:cobblestone'
		event.recipes.create.crushing([
			Item.of(`2x ${crushedOreName}`).withChance(0.30),
			Item.of(crushedOreName),
			Item.of(stoneType).withChance(0.12)
		  ], oreName)
		event.recipes.create.milling(crushedOreName, oreName)
	}
	const pressing = (name) => {
		event.recipes.create.pressing(`thermal:${name}_plate`, `thermal:${name}_ingot`)
	}
	const mixing = (output, ingredients) => {
		return event.recipes.create.mixing(output, ingredients)
	}
	const multiSmelt = (input, output) => {
		event.smelting(output, input)
    	event.blasting(output, input)
	}
	const processCrushedOre = (name, outputModID, nuggetOverride, ingotOverride) => {
		var _oreJank = name.startsWith('$'); if (_oreJank) name = name.substring(1);
		var _nugget = nuggetOverride || `${outputModID}:${name}_nugget`
		var _ingot = ingotOverride   || `${outputModID}:${name}_ingot`
		var _crushed = `kubejs:crushed_${name}` + (_oreJank ? '_ore' : '')
		multiSmelt(_crushed, _ingot)
		event.recipes.create.splashing([
			Item.of(`10x ${_nugget}`),
			Item.of(`5x ${_nugget}`).withChance(0.5)
		], _crushed)
	}

	pressing('bronze')
	pressing('invar')
	pressing('electrum')
	pressing('constantan')
	pressing('signalum')
	pressing('lumium')
	pressing('enderium')

	processCrushedOre('bronze', 'thermal')
	processCrushedOre('invar', 'thermal')
	processCrushedOre('electrum', 'thermal')
	processCrushedOre('constantan', 'thermal')
	processCrushedOre('signalum', 'thermal')
	processCrushedOre('lumium', 'thermal')
	processCrushedOre('enderium', 'thermal')

	mixing('4x kubejs:crushed_bronze', [
		'create:crushed_copper_ore',
		'create:crushed_copper_ore',
		'create:crushed_copper_ore',
		'create:crushed_tin_ore'
	])

	mixing('3x kubejs:crushed_invar', [
		'create:crushed_iron_ore',
		'create:crushed_iron_ore',
		'create:crushed_nickel_ore'
	])

	mixing('2x kubejs:crushed_electrum', [
		'create:crushed_gold_ore',
		'create:crushed_silver_ore'
	])

	mixing('2x kubejs:crushed_constantan', [
		'create:crushed_copper_ore',
		'create:crushed_nickel_ore'
	])

	mixing('4x kubejs:crushed_signalum', [
		'create:crushed_copper_ore',
		'create:crushed_copper_ore',
		'create:crushed_copper_ore',
		'create:crushed_tin_ore',
		'minecraft:redstone',
		'minecraft:redstone'
	])

	mixing('4x kubejs:crushed_lumium', [
		'create:crushed_silver_ore',
		'create:crushed_tin_ore',
		'create:crushed_tin_ore',
		'create:crushed_tin_ore',
		'minecraft:glowstone_dust',
		'minecraft:glowstone_dust'
	])

	mixing('2x kubejs:crushed_enderium', [
		'thermal:diamond_dust',
		'create:crushed_lead_ore',
		'create:crushed_lead_ore',
		'create:crushed_lead_ore',
		'thermal:ender_pearl_dust',
		'thermal:ender_pearl_dust'
	])
	
	event.recipes.create.splashing([
		Item.of(`minecraft:netherite_scrap`),
		Item.of(`minecraft:netherite_scrap`).withChance(0.66)
	], 'kubejs:crushed_ancient_debris')
})

onEvent('item.tags', event => {
	// Get the #forge:cobblestone tag collection and add Diamond Ore to it
	// event.get('forge:cobblestone').add('minecraft:diamond_ore')

	// Get the #forge:cobblestone tag collection and remove Mossy Cobblestone from it
	// event.get('forge:cobblestone').remove('minecraft:mossy_cobblestone')
})