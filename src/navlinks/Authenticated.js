import { Link } from 'react-router-dom';

const Authenticated = ({logout}) => {

    return (
        <>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
                <span 
                    className="text-danger"
                    onClick = {logout}
                    style = {{ cursor: 'pointer'}}
                >
                    Sign Out
                </span>
            </li>
        </>
    )
}

export default Authenticated