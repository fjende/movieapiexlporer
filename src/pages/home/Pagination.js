import React from 'react'
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        margin: 3,
        display: 'inline-block',
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: 0,
        minWidth: 0,
        marginBottom:  20
    },
}));

function Pagination({ totalPages, nextPage, currentPage }) {

    const classes = useStyles();

    const pageNumbers = [];

    for (let i = 1; i <= totalPages ; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {pageNumbers.map(number => (
                  <Button key={number} variant="outlined" onClick={() => nextPage(number)} className={classes.button} size="small" >
                  {number}
              </Button>
            ))}
        </div>
    )
}

export default Pagination