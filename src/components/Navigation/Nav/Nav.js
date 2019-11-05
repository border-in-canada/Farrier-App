import React from 'react';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';

const nav = (props) => {
    return(
        <div>
            <List component="nav">
                <ListItem component="div">
                    <ListItemText >
                    <Button color="inherit">Link 1</Button>
                    </ListItemText>
                    <ListItemText >
                    <Button color="inherit">Link 2</Button>
                    </ListItemText>
                    <ListItemText >
                    <Button color="inherit">Link 3</Button>
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
}

export default nav;