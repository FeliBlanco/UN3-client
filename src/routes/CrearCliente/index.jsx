import { Alert, Box, Button, Card, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import Menu from "../../components/Menu";
import axios from "axios";
import { useState } from "react";

const defaultErrorsValue = {
    nombre: '',
    apellido: '',
    correo: '',
    domicilio: '',
    celular: '',
    dni: ''
}

export default function CrearCliente() {

    const [getErrors, setErrors] = useState(defaultErrorsValue)

    const [isCreating, setCreating] = useState(false);
    const [isCreated, setCreated] = useState(false);

    const submitCliente = async event => {
        event.preventDefault();
        if(isCreating) return;
        if(isCreated) return;

        const data = new FormData(event.currentTarget);
        console.log(data.get('nombre'))
        const nombre = data.get('nombre');
        const apellido = data.get('apellido');
        const correo = data.get('correo');
        const domicilio = data.get('domicilio');
        const celular = data.get('celular');
        const dni = data.get('dni');

        let errors = {}

        if(!nombre) {
            errors.nombre = "Ingresa un nombre";
        }
        if(!apellido) {
            errors.apellido = "Ingresa un apellido";
        }
        if(!correo) {
            errors.correo = "Ingresa un correo";
        } else if(!/\S+@\S+\.\S+/.test(correo)) errors.correo = "Ingresa un correo válido"
        if(!domicilio) {
            errors.domicilio = "Ingresa un domicilio";
        }
        if(!celular) {
            errors.celular = "Ingresa un celular";
        }
        if(!dni) {
            errors.dni = "Ingresa un dni";
        }

        if(Object.keys(errors).length > 0) {
            setErrors(i => ({...defaultErrorsValue, ...errors}))
            return;
        }
        setErrors(i => defaultErrorsValue)

        setCreating(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user`, {
                firtname: nombre,
                lastname: apellido,
                email: correo,
                domicilio,
                celular,
                documento:dni
            })
            setCreating(false);
            setCreated(true)
            setTimeout(() => {
                window.location.href = "/client"
            }, 2000)
        }
        catch(err) {
            setCreating(false);
        }
    }
    return (
        <div>
            <Menu />
            <Box sx={{padding:'20px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Box sx={{width:{md:'400px', xs:'80%'}}}>
                    {isCreated == true && <Alert sx={{margin:'20px 0'}}>Cliente creado correctamente</Alert>}
                    <Card sx={{padding:'20px'}}>
                        <Typography sx={{margin:'20px 0'}} textAlign={"center"} component="h1" variant="h4">Agregar cliente</Typography>
                        <Box noValidate component="form" sx={{display:'flex', flexDirection:'column', gap:'20px'}} onSubmit={submitCliente}>
                            <Box sx={{display:'flex', gap:'20px'}}>
                                <TextField error={getErrors.nombre.length > 0} helperText={getErrors.nombre} fullWidth placeholder="Nombre" name="nombre" required/>
                                <TextField error={getErrors.apellido.length > 0} helperText={getErrors.apellido} fullWidth placeholder="Apellido" name="apellido" required/>
                            </Box>
                            <TextField error={getErrors.correo.length > 0} helperText={getErrors.correo} fullWidth placeholder="Correo" name="correo"/>
                            <TextField error={getErrors.domicilio.length > 0} helperText={getErrors.domicilio} fullWidth placeholder="Domicilio" name="domicilio"/>
                            <TextField error={getErrors.celular.length > 0} helperText={getErrors.celular} fullWidth placeholder="Celular" name="celular"/>
                            <TextField error={getErrors.dni.length > 0} helperText={getErrors.dni} fullWidth placeholder="DNI" name="dni"/>
                            <Button type="submit" sx={{marginTop:'30px'}} variant="contained" fullWidth disabled={isCreating}>{isCreating == true ? <CircularProgress size="20px" color="secondary" /> : 'Agregar cliente'}</Button>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </div>
    )
}