import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts/TodoContext' 
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

// The localStorage object allows you to save key/value pairs in the browser
// The localStorage object stores data with no expiration date
// The data is not deleted when the browser is closed, and are available for future sessions
// value is stored in string format(need to be converted to json when required)

function App() {
  const [todos, setTodos] = useState([])

  // const addTodo = (todo) => {: This line defines a function called addTodo which takes one parameter todo. This parameter represents the new todo item that is to be added to the list of todos.
  // setTodos((prev) => [{id: Date.now(), ...todo}, ...prev]): This line updates the state of the todos list.
  // (prev) => [...]: This is a functional update, where the new state is computed based on the previous state (prev).
  // [{id: Date.now(), ...todo}, ...prev]: This expression constructs the new state. It creates a new array where the first element is the new todo item. 
  // The new todo item is an object containing:
  // An id property: This is set to the current timestamp using Date.now(). This ensures that each todo item has a unique identifier.
  // Other properties from the todo parameter: The spread operator (...todo) is used to include all properties from the todo object passed as an argument to the addTodo function.
  // ...prev: This spreads the existing todos array (prev) into the new array. This ensures that the existing todos are retained in the list.

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id 
    === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  // page load hone pr ye local storage se todos lekar aaega jo already h
  // local storage se direct access kr skte h jb tk server side rendering nhi ho rahi
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) // "todos" is key stored in local storage
    console.log(JSON.parse(localStorage.getItem("todos")))
    if(todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App