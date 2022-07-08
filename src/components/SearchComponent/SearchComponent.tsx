import React, { FC, useEffect } from 'react';
import styles from './SearchComponent.module.css';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { MenuProps, Search, SearchIconWrapper, StyledInputBase } from '../../constants/search.constant';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { CreateProjectButton } from '../../constants/project.constant';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material';

interface SearchComponentProps {
  search: Function;
  tagList: string[]
}

const CustomizedSelect = styled((props: any) => {
  return( <Select {...props} /> )
})`
  padding: 10px;
  &.MuiOutlinedInput-root {
    padding:0px !important
  }
  & .MuiSelect-select {
    padding:10px !important
  }
  
`;


const SearchComponent: FC<SearchComponentProps> = (props) => {
  const [tags, setTags] = React.useState<string[]>([]);
  const onHandleChange = (ev: any) => {
    if (!ev.target.value || ev.target.value?.length > 2) {
      props.search(ev.target.value, "input");
    }
  }
  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    props.search(tags, "dropdown");
  }, [tags]);
  return (
    <div className={styles.SearchComponent} data-testid="SearchComponent">
      <Grid container>
        <Grid item xs={12} md={4} sm={12}>
          <Box sx={{ flexGrow: 1 }} className={styles.box}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={onHandleChange}
              />
              {/* <Button variant="contained" disableElevation size="small">Search</Button> */}
            </Search>
          </Box>
        </Grid>
        <Grid item xs={12} md={2} sm={12} className={styles.multiSelect}>
          <FormControl className={styles.formControl}>
            {/* <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel> */}
            <CustomizedSelect
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              displayEmpty
              value={tags}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected: any) => {
                if (selected.length === 0) {
                  return <em>-Select Tags-</em>;
                }

                return selected.join(', ');
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem disabled value="">
                <em>-Select Tags-</em>
              </MenuItem>
              {props.tagList.map((tag: any) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={tags.indexOf(tag) > -1} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </CustomizedSelect>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} sm={12}>
          <Box sx={{ flexGrow: 1 }} className={styles.box}>
            <CreateProjectButton className="createProjectTitle">+ <span >Create Project</span> </CreateProjectButton>
          </Box>
        </Grid>
      </Grid>

    </div>
  )
}


export default SearchComponent;
