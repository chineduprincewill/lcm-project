import { Link } from 'react-router-dom';

const Public = () => {

    return (
        <>
            <li>
                <Link to="/">Sign Up</Link>
            </li>
            <li>
                <Link to="/login">Sign In</Link>
            </li>
        </>
    )
}


export default Public;