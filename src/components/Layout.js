import { Outlet } from 'react-router-dom';
import Links from '../Links';

const Layout = () => {
    return (
        <main className='App'>
            <Links />
            <Outlet />
        </main>
    )
}

export default Layout