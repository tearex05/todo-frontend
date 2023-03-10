import { useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getTodo, deleteTodo, updateTodo } from "../api/index.js";
import moment from "moment";

function TodoDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [todo, setTodo] = useState({});
	const [more, setMore] = useState({
		editing: "false",
		todoEdit: todo.title,
	});
	const user = localStorage.getItem("user");
	const [error, setError] = useState("");
	useEffect(() => {
		getTodo(id).then((res) => {
			setTodo(res.data);
			setMore({ ...more, todoEdit: res.data.title });
		});
	}, [id]);
	const submitHandler = (e) => {
		e.preventDefault();
		if (!more.todoEdit) {
			setError("Plz Fill The Input");
		} else {
			updateTodo(id, { title: more.todoEdit });
			setMore({ ...more, editing: false });
			navigate("/todo-frontend");
			setError("");
		}
	};
	const Delete = async () => {
		await deleteTodo(id);
		navigate("/todo-frontend");
	};
	const handleEditing = () => {
		if (more.editing === "false") {
			setMore({ ...more, editing: "true" });
		} else {
			setMore({ ...more, editing: "false" });
		}
	};
	console.log(more.editing)
	if (!user) {
		return (
			<div className="container-not">
				<h1 className="title-not">
					Plz{" "}
					<Link className="link" to="/todo-frontend/login">
						Login
					</Link>{" "}
					or{" "}
					<Link className="link" to="/todo-frontend/signup">
						Signup
					</Link>{" "}
					to Make Todos :)
				</h1>
			</div>
		);
	}
	return (
		<div className="todo-detail">
			{more.editing === "true" ? (
				<>
					<form onSubmit={submitHandler} className="editing">
						<input
							className="input input-edit"
							type="text"
							value={more.todoEdit}
							onChange={(e) =>
								setMore({ ...more, todoEdit: e.target.value })
							}
						/>
						<button type="submit" className="btn">
							Edit
						</button>
					</form>
					<p className="input-error">{error}</p>
				</>
			) : (
				<h1 className="todo-title">{todo.title}</h1>
			)}
			<p className="date">{moment(todo.createdAt).fromNow()}</p>
			<div className="btns">
				<button onClick={handleEditing} className="edit">
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
