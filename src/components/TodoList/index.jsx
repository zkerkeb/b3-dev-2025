

// const fakeTodos = [
//     'Faire les courses',
//     'Rendre le TP',
//     'Faire une sieste'
// ]

import { useState, useEffect } from "react";

const fakeTodoObject = [{
    id: 1,
    title: 'Faire les courses',
    completed: false
},
{
    id: 2,
    title: 'Rendre le TP',
    completed: false
},
{
    id: 3,
    title: 'Faire une sieste',
    completed: false
}
]

const TodoList = () => {
   const [todos, setTodos] = useState([])
   const [newTodo, setNewTodo] = useState('')

   useEffect(() => {
    console.log('todos', todos)
   }, [todos])

   const handleAddTodo = () => {
    if (newTodo.length < 3) {
        alert('La tâche doit contenir au moins 3 caractères')
        return
    }
    
    // le .push modifie le tableau original
    const newTodoObject = {
        id: new Date().getTime(),
        title: newTodo,
        completed: false
    }

    setTodos([newTodoObject, ...todos])
    setNewTodo('')
   }

   const handleDeleteTodo = (id) => {
    const TodoWithoutTodo = todos.filter((t) => t.id !== id)
    // le .filter ne modifie pas le tableau original il en crée un nouveau
    setTodos(TodoWithoutTodo)
   }


    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input 
                value={newTodo}
                onChange={(e) => {
                    setNewTodo(e.target.value)
                }}
                type="text" placeholder="Ajouter une tâche" />
                <button onClick={handleAddTodo}>Ajouter</button>
            </div>
            {todos.map((todo) => {
                return (
                    <div>
                        <p>{todo.title}</p>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Supprimer</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoList;