import React from 'react';
import Typography from '@material-ui/core/Typography';

const splash = (props) => (
    <div style={{paddingTop: "4em"}}>
        <Typography>Welcome to April's Farrier App!</Typography>
        <Typography>We'll have some more stuff here eventually.<br /><br />
        Perhaps you should <a href='http://localhost:3006/signin'>login or sign up!</a></Typography>
    </div>
)

export default splash;