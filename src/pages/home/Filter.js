import React from 'react'
import SearchBar from 'material-ui-search-bar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      paddingTop: 20,
      paddingBottom: 20
    }
  });


const Filter = (props) => {

    const [searchValue, setSearchValue] = React.useState('');
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <SearchBar
        value={searchValue}
        onCancelSearch={(e) => { 
            setSearchValue('')
            props.filterSubmit('') }}
        placeholder={'Search by ' + props.filterTitle}
        onChange={(newValue) => setSearchValue(newValue)}
        onRequestSearch={() => props.filterSubmit(searchValue)}
        style={{
            margin: '0 auto',
            maxWidth: 800
        }}
        />  
        </div>
    )
}

export default Filter;