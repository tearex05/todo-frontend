import React from 'react'
import {FiMoreHorizontal} from 'react-icons/fi'
import {Link} from 'react-router-dom'

function Todo({todo}) {
	return (
		<div className="todo">
			{todo.title.length > 8 ? (
				<p className="title title2">
					{todo.title.slice(0,8)}...
				</p>
				) : (
				<p className="title title2">
					{todo.title}
				</p>
			)}
				<Link to={`todo/${todo._id}`}>
					<FiMoreHorizontal className='more-icon' />
				</Link>
		</div>
	)
}

export default Todo