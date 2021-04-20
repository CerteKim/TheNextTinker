// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

console.info('Hello, World! (You will see this line every time server resources reload)')

onEvent('recipes', event => {

	const crushing = (oreName, crushedOreName, stoneType, baseAmount, bonusAmount) => {
		if (stoneType == undefined) stoneType = 'minecraft:cobblestone'
		if (baseAmount == undefined) baseAmount = 2
		if (bonusAmount == undefined) bonusAmount = 1
		event.recipes.create.crushing([
			Item.of(`${bonusAmount}x ${crushedOreName}`).withChance(0.30),
			Item.of(`${baseAmount}x ${crushedOreName}`),
			Item.of(stoneType).withChance(0.12)
		  ], oreName)
		event.recipes.create.milling(crushedOreName, oreName)
	}
	const pressing = (name, ingotModID) => {
		if (ingotModID == undefined) ingotModID = 'tconstruct'
		event.recipes.create.pressing(`kubejs:${name}_sheet`, `${ingotModID}:${name}_ingot`)
	}
	const mixing = (output, ingredients) => {
		return event.recipes.create.mixing(output, ingredients)
	}
	const multiSmelt = (input, output) => {
		event.smelting(output, input)
    	event.blasting(output, input)
	}
	const splashing = (ingot, nugget, crushed, baseAmount, bonusAmount) => {
		if (baseAmount == undefined) baseAmount = 10
		if (bonusAmount == undefined) bonusAmount = 5
		event.recipes.create.splashing([
			Item.of(`${baseAmount}x ${nugget}`),
			Item.of(`${bonusAmount}x ${nugget}`).withChance(0.50)
		], crushed)

		multiSmelt(crushed, ingot)
	}

	splashing('mekanism:ingot_steel', 'mekanism:nugget_steel', 'kubejs:crushed_steel')

	mixing('4x kubejs:crushed_steel', [
		'create:crushed_iron_ore', 
		'create:crushed_iron_ore', 
		'create:crushed_iron_ore', 
		'create:crushed_iron_ore', 
		'#mekanism:enriched/carbon']).heated()

	mixing('8x kubejs:crushed_refined_obsidian', [
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'#forge:dusts/obsidian', 
		'#forge:dusts/obsidian', 
		'#forge:dusts/obsidian', 
		'#forge:dusts/obsidian', 
		'#forge:dusts/obsidian', 
		'#forge:dusts/obsidian', 
		'#forge:dusts/obsidian', 
		'#forge:dusts/obsidian', 
		'#mekanism:enriched/diamond']).superheated()

	mixing('8x kubejs:crushed_refined_glowstone', [
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'create:crushed_osmium_ore', 
		'#forge:dusts/glowstone', 
		'#forge:dusts/glowstone', 
		'#forge:dusts/glowstone', 
		'#forge:dusts/glowstone', 
		'#forge:dusts/glowstone', 
		'#forge:dusts/glowstone', 
		'#forge:dusts/glowstone', 
		'#forge:dusts/glowstone']).superheated()
})

onEvent('item.tags', event => {
	// Get the #forge:cobblestone tag collection and add Diamond Ore to it
	// event.get('forge:cobblestone').add('minecraft:diamond_ore')

	// Get the #forge:cobblestone tag collection and remove Mossy Cobblestone from it
	// event.get('forge:cobblestone').remove('minecraft:mossy_cobblestone')
})