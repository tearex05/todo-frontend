import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../api/index";


function Signup() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const [error, setError] = useState();
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.password2) {
			setError("Passwords do not match");
		} else if (!formData.name || !formData.email || !formData.password || !formData.password2) {
			setError("Fill All Fields :/");
		} else {
			const userData = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
			};
		await signUp(userData)
			.then(res => {
				localStorage.setItem('user', res.data)
				setError('')
				navigate('/todo-frontend')})
			.catch(error => setError(error.response.data))
		}
	};
	return (
		<div className="signup-container">
			<h1 className="signup-title">Signup</h1>
			<form onSubmit={onSubmit} className="signup-body" action="">
				<input
					name="name"
					value={formData.name}
					onChange={onChange}
					placeholder="name"
					type="text"
					className="input input-signup"
				/>
				<input
					name="email"
					value={formData.email}
					onChange={onChange}
					placeholder="email"
					type="email"
					className="input input-signup"
				/>
				<input
					name="password"
					value={formData.password}
					onChange={onChange}
					placeholder="password"
					type="password"
					className="input input-signup"
				/>
				<input
					name="password2"
					value={formData.password2}
					onChange={onChange}
					placeholder="reEnter your password"
					type="password"
					className="input input-signup"
				/>
				<div className="error">{error}</div>
				<button type="submit" className="btn signup-btn">
					Signup
				</button>
			</form>
			<p className='margin'>Already Have An Account? <Link className='link' to='/login'>Login</Link></p>
		</div>
	);
}

export default Signup;
