// importing express module
const express = require('express');
// Creating an express application
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Sample to-do-list data
const toDoList = [{
    id: 1,
    title: "Saddam Ahmad",
    completed: false
}];
// port number
const port = 8081;




// Define rotes for the application
// The root toute seves a simple message
// http://localhost:8081
// a simple get route
app.get('/', (req, res) => {
    res.status(200).send('Hello Page !!');
});


// a simple get/todos route
// http://localhost:8081/todos
app.get('/todos', (req, res) => {
    res.status(200).send(toDoList);
});


// a simple get/todos/:id route
// http://localhost:8081/todos/:id
app.get('/todos/:id', (req, res) => {
    const toDoId = parseInt(req.params.id);
    const toDoItem = toDoList.find((each) => each.id === toDoId);
    if (!toDoItem) {
        return res.status(404).send({
            success: false,
            message: "Task not Correct"
        })
    }
    res.status(200).json({
        success: true,
        data: toDoItem

    })
});


// a simple put/todos/:id route
// http://localhost:8081/todos/:id
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Find the toDoItem of the to-do item to be updated
    const toDoItem = toDoList.find(each => each.id === id);
    if (!toDoItem) {
        return res.status(404).send({
            success: false,
            message: "Put not found"
        })
    }
    toDoItem.title = req.body.title || toDoItem.title;

    res.status(200).json({
        message: "Task updated successfully",
        data: toDoItem
    });
});
// a simple patch/todos/:id route
// http://localhost:8081/todos/:id
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const toDoItem = toDoList.find(each => each.id === id);
    if (!toDoItem) {
        return res.status(404).json({
            success: false,
            message: "Patch not found"
        });
    }
    toDoItem.completed = req.body.completed;
    res.status(200).json({
        success: true,
        message: "Task status updated successfully",
        data: toDoItem
    });
});

// a simple post/todos route
// http: //localhost:8081/todos
app.post('/todos', (req, res) => {
    if (!req.body || !req.body.title) {
        return res.status(400).json({
            success: false,
            message: "Post request body is missing or invalid"
        })
    }
    const newToDo = {
        id: Date.now(), //Unique id
        title: req.body.title, //task name
        completed: false // defalt status
    }

    toDoList.push(newToDo)
    res.status(201).json({
        message: "Task added successfully !",
        data: newToDo
    });
});

// a simple delete/todos route
// http://localhost:8081/todos/:id.
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const toDoItem = toDoList.findIndex(each => each.id === id);

    if (toDoItem === -1) {
        return res.status(404).json({
            success: false,
            message: "Delete item not found"
        })
    }
    const deletedItem = toDoList.splice(toDoItem, 1)[0];
    res.status(200).json({
        message: "Task deleted successfully !",
        data: deletedItem

    });
});

// listner method
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});