import React, {useEffect} from 'react'; //useEffect хук для отслеживия готовности DOM дерева
import TodoList from './components/TodoList'

import Loader from './Loader'
import Modal from './modal/Modal'
import Context from './context'

//позволяет загрузить часть кода ленив
const AddTodo = React.lazy(() => import('./components/AddTodo'))

function App() {
  
  const [todos, setTodos] = React.useState([]); 
  const [loading, setLoading] = React.useState(true); //true - показывает, false - иначе
  //Служит для измениея элемента todos функцией SET
  // useState для перерендования сосятояния
  // useState видим измения в массиве


  //После определения useState, вызывет colback у useEffect
  //2 параметр - это список зависимостей для отработки colback
  //пустой массив потому что нам надо чтобы отработало только 1 раз
  useEffect(() => { 
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
    
  }, [])

  function toggleTodo(id) {
    setTodos(todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title: title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{removeTodo: removeTodo}}> {/*Позволяет вызывать фукнции не проходям через вложенность*/}
      <div className = "wrapper">
        <h1 className = "title">ToDo List</h1>
        
        <Modal></Modal>
        
        <React.Suspense fallback={<p>Loading...</p>}>{/*Позволяет Reactу понять что компонент загружается лениво*/}
          <AddTodo onCreate={addTodo}></AddTodo> 
        </React.Suspense>
        
        {loading && <Loader></Loader>}
        {todos.length ? 
        (
          <TodoList todos={todos} onToggle={toggleTodo}></TodoList>
        ) : (
            loading ? null : <p>No todos!</p>
        )}
        
      </div>
    </Context.Provider>
  );
}

export default App;
