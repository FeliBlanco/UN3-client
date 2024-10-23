import { Avatar, Box, Button, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {

    const { user } = useAuth0()


    console.log(user)
    return (
        <div>
            <Menu />
            <Box sx={{padding:'20px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <Box display="flex" alignItems={"center"} gap="10px">
                    <Avatar src={user.picture}/>
                    <Typography>Bienvenido, {user.name}!</Typography>
                </Box>
                <Box>
                    <Button sx={{margin:'20px'}} variant="contained" onClick={() => window.location.href = "/client/"}>Ver clientes</Button>
                </Box>
            </Box>
        </div>
    )
}