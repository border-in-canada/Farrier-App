import React, { Component } from 'react';
import Griddle, { RowDefinition, ColumnDefinition } from 'griddle-react';
import styles from './Clients.module.css';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


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
        axios.get('http://localhost:3000/clients?page=0&pagesize=10', { withCredentials: true })
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

    getRowData = (key) => {
        const rowData = this.state.data[key];
        this.props.onRowSelect(rowData, this.props.history);
    }


    render() {

        const layout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
            <div>
                <div className={styles.Layout}>
                    <Filter />
                    <SettingsWrapper />
                </div>
                <div className={styles.Table}><Table /></div>
                <div className={styles.Pagination}>
                    <Pagination />
                </div>
            </div>
            
        );

        const styleConfig = {
            styles: {
                Table: {borderCollapse: 'collapse', width: '100%'},
                TableHeading: {color: '#394F3C'},
                TableHeadingCell: {padding: '2em', borderBottom: '1px solid rgb(199, 198, 198)'},
                NextButton: {marginLeft: '1em'},
                PreviousButton: {marginLeft: '1em'},
                PageDropdown: {marginLeft: '1em'}
            },
            classNames: {
                SettingsToggle: styles.SettingsButton,
                Filter: styles.Filter,
                Row: styles.Row,
                Cell: styles.Cell
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
                    components={{
                        Layout: layout, 
                        RowEnhancer: OriginalComponent => props => (
                        <OriginalComponent
                           {...props}
                           onClick={() => this.getRowData(props.griddleKey)}
                        />)}}>
                    <RowDefinition>
                        <ColumnDefinition id="name" order={1} />
                        <ColumnDefinition id="email" order={2} />
                        <ColumnDefinition id="phone" order={3} />
                        <ColumnDefinition id="address1" order={4} />
                        <ColumnDefinition id="city" order={5} />
                        <ColumnDefinition id="postalCode" order={6} />
                    </RowDefinition> 
                </Griddle>
            </div>
        );
    }
    
    updateTableState = (data, currentPage) => {
        this.setState({ 
            data: data, 
            currentPage: currentPage
        });
      }

    _onNext = () => {
        const { currentPage, pagesize } = this.state;
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

const mapDispatchToProps = dispatch => {
    return {
        onRowSelect: (rowData, history) => dispatch(actions.rowSelect(rowData, history))
    }
};

export default withRouter(connect(null, mapDispatchToProps)(Clients));