// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')

onEvent('item.registry', event => {
	const addItem = (name) => { 
		var formattedName = name.toLowerCase().replace(/ /g, '_').replace(/'/g, ''); 
		event.create(formattedName).displayName(name); 
	}
	const addGeneralPurposeMetal = (name, orename) => {
		if (name.startsWith('$')) 
		{
			name = name.substring(1); 
			orename = `${name} Ore`;
		} 
		if (orename == undefined) 
		{ 
			orename = name; 
		}
		console.log(`Adding ${name} Sheet & Crushed ${orename}`)
		addItem(`Crushed ${orename}`);
		addItem(`${name} Sheet`);
	}

	addGeneralPurposeMetal('$Cobalt')
	addGeneralPurposeMetal('Netherite', 'Ancient Debris')
	addGeneralPurposeMetal('Manyullyn')
	addGeneralPurposeMetal('Hepatizon')
	addGeneralPurposeMetal('Queen\'s Slime')
	addGeneralPurposeMetal('Slimesteel')
	addGeneralPurposeMetal('Tinker\'s Bronze')
	addGeneralPurposeMetal('Rose Gold')
	addGeneralPurposeMetal('Pig Iron')
	addItem('Zinc Sheet')

})

onEvent('block.registry', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})