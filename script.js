const addButton = document.getElementById( 'add-task-btn' );
const taskInput = document.getElementById( 'task-input' );
const taskList = document.getElementById( 'task-list' );


function addTask ( defaultTask, save = true ) {
    let taskText = defaultTask || taskInput.value.trim();
    if ( taskText === "" ) {
        return alert("Enter a task!")
    } else {
        let li = document.createElement( 'li' );
        li.textContent = taskText;

        let removeButton = document.createElement( 'button' );
        removeButton.textContent = 'Remove';
        removeButton.classList.add( 'remove-btn' );
        
        li.appendChild( removeButton );
        taskList.appendChild( li );

        removeButton.addEventListener( 'click', () => {
            // Remove task from the list
            li.remove();

            // Remove task from localStorage
            let allTasks = JSON.parse( localStorage.getItem( 'tasks' ) ) || [];
            allTasks = allTasks.filter( task => task !== taskText );
            localStorage.setItem( 'tasks', JSON.stringify( allTasks ) );
        } );

        taskInput.value = "";
    }
    if ( save ) {
        allTasks = JSON.parse( localStorage.getItem( 'tasks' ) ) || [];
        allTasks.push( taskText );
        localStorage.setItem( 'tasks', JSON.stringify( allTasks ) );
    }
}

addButton.addEventListener( 'click', ()=> addTask() );
taskInput.addEventListener( 'keypress', ( event ) => {
    if ( event.key === "Enter" ) {
        addTask();
    }
} )

function loadTasks () {
    const listOfTasks = JSON.parse( localStorage.getItem( 'tasks' ) ) || [];
    console.log(listOfTasks)
    listOfTasks.forEach(task => {
        addTask( task, false);
    });
}

document.addEventListener( "DOMContentLoaded", loadTasks);