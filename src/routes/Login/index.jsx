import { useAuth0 } from "@auth0/auth0-react";

import Menu from "../../components/Menu";
import { Box, Button } from "@mui/material";


export default function Login() {

    const { loginWithRedirect } = useAuth0();

    return (
        <Box sx={{width:'100%', height:'100vh', display:'flex', flexDirection:'column'}}>
            <Menu />
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flex:1}}>
                <Button onClick={() => loginWithRedirect()} variant="contained">Iniciar sesión</Button>
            </Box>
        </Box>
    )
}