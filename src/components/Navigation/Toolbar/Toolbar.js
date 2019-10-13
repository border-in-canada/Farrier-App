import React from 'react';
import styles from './Toolbar.module.css';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div>
            <h1>MENU</h1>
        </div>
        <div>
            <h1>LOGO</h1>
        </div>
       <nav>
           <div style={{paddingRight:'1em'}}>Link 1</div>
           <div style={{paddingRight:'1em'}}>Link 2</div>
           <div style={{paddingRight:'1em'}}>Link 3</div>
       </nav>
    </header>
)

export default toolbar;