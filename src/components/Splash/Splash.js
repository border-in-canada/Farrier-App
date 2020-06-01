import React from 'react';
import Typography from '@material-ui/core/Typography';

const splash = (props) => (
    <div style={{paddingTop: "4em"}}>
        <Typography>Welcome to Happy Hooves, a farrier management App!</Typography>
        <Typography>This page is the public facing page. This app is still a work in progress.<br /><br />
        To see more functions, perhaps you should <a href='http://localhost:3006/signin'>login or sign up</a>, or click the login link in the upper right!</Typography>
    </div>
)

export default splash;