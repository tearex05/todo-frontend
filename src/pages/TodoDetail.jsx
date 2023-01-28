import {useEffect, useState} from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import {useParams, useNavigate} from 'react-router-dom'
import {getTodo, deleteTodo, updateTodo} from '../api/index.js'
import moment from 'moment'

function TodoDetail() {
	const {id} = useParams()
	const navigate = useNavigate()
	const [todo, setTodo] = useState({})
	const [more, setMore] = useState({
		editing: false,
		todoEdit: todo.title
	})
	useEffect(() => {
		getTodo(id)
		.then(res => {
			setTodo(res.data)
			setMore({...more, todoEdit: res.data.title})
		})
	}, [id, more])
	const submitHandler = () => {
		updateTodo(id, {"title": more.todoEdit})
		setMore({...more, editing: false})
		navigate('/todo-frontend')
	}
	const Delete = async () => {
		await deleteTodo(id)
		navigate('/todo-frontend')
	}
	return (
		<div className="todo-detail">
			{more.editing ? (
				<form onSubmit={submitHandler} className="editing">
					<input className='input input-edit' type="text" value={more.todoEdit} onChange={(e) => setMore({...more, todoEdit: e.target.value})} />
					<button className="btn">Edit</button>
				</form>
				) : (
				<h1 className="todo-title">
					{todo.title}
				</h1>
				)}
			<p className="date">{moment(todo.createdAt).fromNow()}</p>
			<div className="btns">
				<button onClick={() => setMore({...more, editing: true})} className="edit">
					<BiPencil size="3.5em" color="white" />
				</button>
				<button onClick={Delete} className="delete">
					<BiTrash size="3.5em" color="white" />
				</button>
			</div>
		</div>
	);
}

export default TodoDetail;
