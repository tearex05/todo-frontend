import {useState} from 'react'
import {logIn} from '../api/index'
import {useNavigate, Link} from 'react-router-dom'

function Login() {
	const [formData, setFormData] = useState({
		email: "", password: ""
	})
	const navigate = useNavigate()
	const [error, setError] = useState();
	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	const onSubmit = async (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			setError("Fill All Fields :/");
		} else {
			const userData = {
				"email": formData.email,
				"password": formData.password,
			};
		await logIn(userData)
			.then(res => {
				localStorage.setItem('user', res.data)
				setError('')
				navigate('/todo-frontend')
			})
			.catch(error => setError(error.response.data))
		}
	}
	return (
		<div className="login-container">
		<h1 className='login-title'>Login</h1>
			<form onSubmit={onSubmit} className='login-body' action="">
			<input required name='email' value={formData.email} onChange={onChange} placeholder='email' type="email" className='input input-login' />
			<input required name='password' value={formData.password} onChange={onChange} placeholder='password' type="password" className='input input-login' />
			<div className="error">{error}</div>
			<button type='submit' className="btn login-btn">Login</button>
			</form>
			<p className='margin'>Don't Have An Account? <Link className='link' to='/signup'>Signup</Link></p>
		</div>
	)
}

export default Login