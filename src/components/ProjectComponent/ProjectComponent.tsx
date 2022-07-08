import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/fetchData';
import ProjectChildComponent from '../ProjectChildComponent/ProjectChildComponent';
import SearchComponent from '../SearchComponent/SearchComponent';
import styles from './ProjectComponent.module.css';
import { WaveScanResponse } from '../../models/wave-scan.interface';

interface ProjectComponentProps {
}

const ProjectComponent: FC<ProjectComponentProps> = (props: any) => {
  const itemList: WaveScanResponse[] = props.item;
  const [filteredList, setFilterList] = useState<WaveScanResponse[]>([]);
  const [tagList, setTagList] = useState<Array<string>>([]);

  useEffect(() => {
    if(!itemList || !itemList.length)
      props.dispatch(fetchProducts())
    else {
      let tmpTagList:any = [];
      itemList.forEach(el => tmpTagList.push(...el.tags));
      tmpTagList = Array.from(new Set(tmpTagList));
      setTagList(tmpTagList);
      setFilterList(itemList);
    }
    
  }, [itemList]);

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
      setFilterList(temp);
  };

  return (
    <div className={styles.ProjectComponent} data-testid="ProjectComponent">
      <SearchComponent search={userInputSearch} tagList={tagList}/>
      <div>
          <h2 className={styles.title}> Projects</h2>
          <div className={styles.p15}>
            <ProjectChildComponent itemList={filteredList}/>
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
