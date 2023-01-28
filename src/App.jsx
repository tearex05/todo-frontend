import {useState, useEffect} from 'react'
import Todo from './components/Todo'
import {getTodos, createTodo} from './api/index.js'
import {Link} from 'react-router-dom'


function App() {
  const [data, setData] = useState('')
  const user = localStorage.getItem('user')
  const [todos, setTodos] = useState([])
  useEffect(() => {
    getTodos()
    .then((res) => {
      setTodos(res.data.reverse())
    })
  }, [todos])
  const myTodos = todos.filter((todo) => todo.creator === user)
  const submitHandler = (e) => {
    e.preventDefault()
    createTodo({"creator": user, "title": data})
    setData('')
  }
  if(!user){
    return (
      <div className="container-not">
        <h1 className="title-not">
          Plz <Link className='link' to='login'>Login</Link> or <Link className='link' to='signup'>Signup</Link> to Make Todos :)
        </h1>
      </div>
    )
  }
  return (
    <div className="container">
    <form className='form1' onSubmit={submitHandler}>
      <input placeholder='Type Your Todo' type="text" className='input' value={data} onChange={(e) => setData(e.target.value)} />
      <button className='btn' type='submit'>Submit</button>
    </form>
      <div className="todos">
        {myTodos.map((todo) => (
        <Todo key={todo._id} todo={todo} />
      ))}
      </div>
    </div>
  )
}


export default App