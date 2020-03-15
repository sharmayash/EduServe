import React from 'react';

// Material components
import {
    Typography,
    Container,
} from '@material-ui/core';

// Material helpers
import { makeStyles } from '@material-ui/core/styles';

// Custom styles
import styles from './styles'

const useStyles = makeStyles(styles);

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">My sticky footer can be found here.</Typography>
                </Container>
            </footer>
        </div>
    );
}
