import React, { Component } from 'react';
import Griddle, { RowDefinition, ColumnDefinition } from 'griddle-react';
import styles from './Clients.module.css';
import axios from 'axios';

const getClientsForGrid = (currentPage, pagesize, callback) => {
    const uri = `http://localhost:3000/clients?page=${currentPage - 1}&pagesize=${pagesize}`;
    axios.get(uri, { withCredentials: true })
      .then((response) => {
        callback(response.data.clients, response.data.page.currentPage)
      }, (error) => {
        return error
      });
  }

class Clients extends Component {

    state = {
        data: [],
        pagesize: 0,
        currentPage: 0,
        recordCount: 0,
        loading: true
    }

    componentDidMount() {
        axios.get('http://localhost:3000/clients?page=0&pagesize=20', { withCredentials: true })
        .then(response => {
            this.setState((state) => ({
                data: response.data.clients.slice(response.data.page.currentPage - 1, response.data.page.pagesize),
                pagesize: response.data.page.pagesize,
                currentPage: response.data.page.currentPage,
                recordCount: response.data.total,
                loading: false
            }));        
        })
        .catch(error => {
            return error
        })
    }

    render() {

        const layout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
            <div>
                <div  className={styles.Layout}>
                    <Filter />
                    <SettingsWrapper />
                </div>
                <div><Table /></div>
                <div className={styles.Pagination}>
                    <Pagination />
                </div>
            </div>
            
        );

        const styleConfig = {
            styles: {
                Table: {borderCollapse: 'collapse'},
                TableHeadingCell: {padding: '2.5em', borderBottom: '1px solid #ccc'},
                Cell: {borderBottom: '1px solid #ccc'},
                Filter: {borderStyle: 'none none solid none', borderBottom: '1px solid #ccc', boxShadow: '0px 1px #ccc', height: '2em', width: '20em', fontSize: '14px', marginLeft: '1.5em'},
                SettingsToggle: {fontSize: '14px', borderRadius: '5px', marginLeft: '1.5em'},
                NextButton: {margin: '1.5em'},
                PreviousButton: {margin: '1.5em'},
                PageDropdown: {margin: '1.5em'}
            }
        }


        const { data, pagesize, currentPage, recordCount }  = this.state;

        return(
            <div className={styles.GridContainer}>
                <Griddle 
                    data={data}
                    styleConfig={styleConfig}
                    pageProperties={{
                        currentPage,
                        pagesize,
                        recordCount
                      }}
                    events={{
                    onNext: this._onNext,
                    onPrevious: this._onPrevious,
                    onGetPage: this._onGetPage
                    }}
                    components={{Layout: layout}} >
                    <RowDefinition>
                        <ColumnDefinition id="name" order={1} />
                        <ColumnDefinition id="email" order={2} />
                        <ColumnDefinition id="phone" order={3} />
                        <ColumnDefinition id="address1" order={4} />
                        <ColumnDefinition id="city" order={5} />
                        <ColumnDefinition id="postalCode" order={6} />
                        <ColumnDefinition id="updatedAt" order={7} />
                    </RowDefinition>   
                </Griddle>
            </div>
        );
    }
    
    updateTableState = (data, currentPage) => {
        console.log(data);
        this.setState({ 
            data: data, 
            currentPage: currentPage
        });
      }

    _onNext = () => {
        const { currentPage, pagesize } = this.state;
        console.log(pagesize);
        getClientsForGrid(currentPage + 1, pagesize, this.updateTableState);
      }
    _onPrevious = () => {
    const { currentPage, pagesize } = this.state;
    getClientsForGrid(currentPage - 1, pagesize, this.updateTableState);
    }
    _onGetPage = (pageNumber) => {
        const { pagesize } = this.state;
        getClientsForGrid(pageNumber, pagesize, this.updateTableState);
    }

}

export default Clients;