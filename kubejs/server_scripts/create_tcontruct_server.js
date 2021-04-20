// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

console.info('Hello, World! (You will see this line every time server resources reload)')

onEvent('recipes', event => {
	const netheriteOre = '#forge:ores/netherite_scrap'
	const netheriteScrap = 'minecraft:netherite_scrap'

	const genericOreCrushing = (oreName, crushedOreName, stoneType) => {
		if (stoneType == undefined) stoneType = 'minecraft:cobblestone'
		event.recipes.create.crushing([
			Item.of(`2x ${crushedOreName}`).withChance(0.30),
			Item.of(crushedOreName),
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

	genericOreCrushing('minecraft:ancient_debris', 'kubejs:crushed_ancient_debris', 'minecraft:netherrack')
	genericOreCrushing('tconstruct:cobalt_ore',    'kubejs:crushed_cobalt_ore',     'minecraft:netherrack')
	pressing('netherite', 'minecraft')
	pressing('zinc', 'create')
	pressing('cobalt')
	pressing('tinkers_bronze')
	pressing('slimesteel')
	pressing('queens_slime')
	pressing('rose_gold')
	pressing('pig_iron')
	pressing('manyullyn')
	pressing('hepatizon')

	mixing('2x kubejs:crushed_hepatizon', [
		'create:crushed_copper_ore',
		'create:crushed_copper_ore',
		'kubejs:crushed_cobalt_ore',
		'create:powdered_obsidian'
	]).superheated()

	mixing('2x kubejs:crushed_queens_slime', [
		'minecraft:magma_cream',
		'create:crushed_gold_ore',
		'kubejs:crushed_cobalt_ore'
	]).superheated()

	mixing('2x kubejs:crushed_slimesteel', [
		'create:crushed_iron_ore',
		'tconstruct:grout',
		'tconstruct:sky_slime_ball'
	]).heated()

	mixing('4x kubejs:crushed_tinkers_bronze', [
		'create:crushed_copper_ore',
		'create:crushed_copper_ore',
		'create:crushed_copper_ore',
		'#forge:sand'
	]).heated()

	mixing('4x kubejs:crushed_rose_gold', [
		'create:crushed_copper_ore',
		'create:crushed_copper_ore',
		'create:crushed_copper_ore',
		'create:crushed_gold_ore'
	]).heated()

	mixing('2x kubejs:crushed_pig_iron', [
		'create:crushed_iron_ore',
		'tconstruct:blood_slime_ball',
		'minecraft:clay_ball'
	]).heated()

	mixing('4x kubejs:crushed_manyullyn', [
		'kubejs:crushed_cobalt_ore',
		'kubejs:crushed_cobalt_ore',
		'kubejs:crushed_cobalt_ore',
		'kubejs:crushed_ancient_debris'
	]).superheated()

	processCrushedOre('$cobalt', 'tconstruct')
	processCrushedOre('tinkers_bronze', 'tconstruct')
	processCrushedOre('slimesteel', 'tconstruct')
	processCrushedOre('queens_slime', 'tconstruct')
	processCrushedOre('pig_iron', 'tconstruct')
	processCrushedOre('manyullyn', 'tconstruct')
	processCrushedOre('hepatizon', 'tconstruct')
	processCrushedOre('rose_gold', 'tconstruct')
	
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