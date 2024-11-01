const fs=require('fs');
const yargs = require('yargs');
/*
read todo
add todo 
update 
delete 
save todos
*/

const loadtodo=()=>{
	try {
		const todos=fs.readFileSync('todos.json')
		return JSON.parse(todos.toString());
	} catch (error) {
		return []
	}
}
const saveTodo=(todos)=>{
	fs.writeFileSync('todos.json',JSON.stringify(todos))
}

const writetodo=(title)=>{
	const alltodos=loadtodo();
	const duplicates=alltodos.find(todo=>todo.title===title)
	console.log(duplicates);
	
	if(!duplicates){
		alltodos.push({title})
		saveTodo(alltodos);
		console.log("todo added!");
		
	}
	else{
		console.log("todo already present");
		
	}
}
const list=()=>{
	const todos=loadtodo();
	todos.forEach(element => {
		console.log(element)
	});
	
}
yargs.command({
    command: 'add',
    describe: 'Add a new todo',
    builder: {
        title: {
            describe: 'Todo title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        writetodo(argv.title);
    }
})
yargs.command({
    command: 'list',
    describe: 'List all todos',
    handler() {
        list();
    }
}).help().argv;