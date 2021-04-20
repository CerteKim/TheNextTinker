// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')

onEvent('item.registry', event => {
	const addItem = (name) => { 
		var formattedName = name.toLowerCase().replace(/ /g, '_').replace(/'/g, ''); 
		event.create(formattedName).displayName(name); 
	}
	addItem('Crushed Enderium')
	addItem('Crushed Lumium')
	addItem('Crushed Signalum')
	addItem('Crushed Bronze')
	addItem('Crushed Constantan')
	addItem('Crushed Electrum')
	addItem('Crushed Invar')
})

onEvent('block.registry', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})