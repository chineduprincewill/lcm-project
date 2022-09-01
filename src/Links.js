import useAuth from './hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import Authenticated from './navlinks/Authenticated';
import Public from './navlinks/Public';


const Links = () => {

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const from = "/login";

    const logout = (e) => {

        e.preventDefault();

        setAuth({});
        navigate(from, { replace: true });
    }

    return (
        <section>
            <ul className="links" >
               {
                auth?.email
                    ? <Authenticated setAuth = {setAuth} logout = {logout} />
                    : <Public />
               }
            </ul>
        </section>
    )
}

export default Links;