import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/fetchData';
import ProjectChildComponent from '../ProjectChildComponent/ProjectChildComponent';
import SearchComponent from '../SearchComponent/SearchComponent';
import styles from './ProjectComponent.module.css';
import { WaveScanResponse } from '../../models/wave-scan.interface';
import Pagination from '@mui/material/Pagination';

interface ProjectComponentProps {
}

const ProjectComponent: FC<ProjectComponentProps> = (props: any) => {
  const itemList: WaveScanResponse[] = props.item;
  const [filteredList, setFilterList] = useState<WaveScanResponse[]>([]);
  const [displayingRecords, setDisplayingRecords] = useState<WaveScanResponse[]>([]);
  const [tagList, setTagList] = useState<Array<string>>([]);
  const [totalPage, setTotalPage] = useState<number>(10)
  const range:number = 20;
  useEffect(() => {
    if(!itemList || !itemList.length)
      props.dispatch(fetchProducts())
    else {
      let tmpTagList:any = [];
      itemList.forEach(el => tmpTagList.push(...el.tags));
      tmpTagList = Array.from(new Set(tmpTagList));
      setTagList(tmpTagList);
      const rem = itemList.length % range;
      const total = (itemList.length-rem)/range;
      setTotalPage(rem ? total + 1 : total);
      onPagination(1, itemList);
      setFilterList(itemList);
    }
    
  }, [itemList]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPagination(value, filteredList);
  };

  const onPagination = (page: number, list: any) => {
    const start = page === 1 ? 0 : (page-1) * range;
    setDisplayingRecords(list.slice(start, start + range));
   
  }
  const userInputSearch = (value: any, type: string) => {
    
    let temp: WaveScanResponse[] = [];
    switch(type) {
      case "input":
        const searchTerm = value.toLowerCase();
        temp =itemList.filter(el => (!searchTerm || (el.title?.toLowerCase().indexOf(searchTerm) > -1 || el.description.indexOf(searchTerm) > -1)));
        break;
      case "dropdown":
        if(value && value.length) {
          value.forEach((option: any) => {
            let result = [];
            result =itemList.filter(el => el.tags.indexOf(option) > -1);
            temp = [...temp, ...result];
          });
        } else {
          temp = itemList;
        }
       
        break;
      }
      const rem = temp.length % range;
      const total = (temp.length-rem)/range;
      setTotalPage(rem ? total + 1 : total);
      onPagination(1, temp);
      setFilterList(temp);
  };

  return (
    <div className={styles.ProjectComponent} data-testid="ProjectComponent">
      <SearchComponent search={userInputSearch} tagList={tagList}/>
      <div>
        <div className={styles.dFlex}>
        <h2 className={styles.title}> Projects </h2>
        <Pagination count={totalPage} onChange={handleChange} className={styles.mAuto}/>
        </div>
          
          <div className={styles.p15}>
            {displayingRecords.length ? <ProjectChildComponent itemList={displayingRecords}/> : <h3>Loading...</h3>}
          </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  item: state.products.item,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(ProjectComponent);
