import { HiHome } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";


function Nav() {
	const navigate = useNavigate()
	const user = localStorage.getItem('user')
	const onLogout = () => {
		localStorage.removeItem('user')
		navigate('/todo-frontend')
	}
	return (
		<>
			<div className="nav">
				<Link to="/todo-frontend">
					<HiHome color="white" size="2em" />
				</Link>
				<div className="account-things">
					{user ? (
						<div className="account-things">
							<button onClick={onLogout} className="logout">Logout</button>
						</div>
					) : (
						<div className="account-things">
							<Link to="/signup">Signup</Link>
							<p className="line"> | </p>
							<Link to="/login">Login</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Nav;
