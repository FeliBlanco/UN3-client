import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

import Home from './Home'
import Login from './Login'
import LoguedRoute from '../../LoguedRoute';
import UnloguedRoute from '../../UnloguedRoute';
import CrearCliente from './CrearCliente';
import EditarCliente from './EditarCliente';
import Clientes from './Clientes';


const routes = createBrowserRouter([
    {
        path:'/',
        element: <LoguedRoute><Home/></LoguedRoute>
    },
    {
        path:'/client',
        element: <LoguedRoute><Clientes/></LoguedRoute>
    },
    {
        path:'/client/crear',
        element: <LoguedRoute><CrearCliente/></LoguedRoute>
    },
    {
        path:'/client/:id/edit',
        element: <LoguedRoute><EditarCliente/></LoguedRoute>
    },
    {
        path:'/login',
        element: <UnloguedRoute><Login/></UnloguedRoute>
    }
])

export default function Routes({children}) {

    const { isLoading } = useAuth0();

    if(isLoading) return <div>Loading...</div>

    return (
        <RouterProvider router={routes}>{children}</RouterProvider>
    )
}