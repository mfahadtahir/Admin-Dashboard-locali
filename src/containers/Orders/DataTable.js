import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import CloseCircleOutlineIcon from 'mdi-react/CloseCircleOutlineIcon';
import DataPaginationTable from '../../shared/components/table/DataPaginationTable';
import Pagination from '../../shared/components/pagination/Pagination';
// import {auth} from '../LogIn/Firebase/auth'
import { db }  from '../LogIn/Firebase/firestore'

export default class DataTable extends PureComponent {
  constructor() {
    super();
    this.heads = [
      {key: 'id', name: '#', width: 80 },
      {key: 'fName', name: 'First Name', sortable: true,},
      {key: 'lName', name: 'Last Name', sortable: true,},
      {key: 'date', name: 'Date', sortable: true,},
      {key: 'amount', name: 'Amount', sortable: true},
      {key: 'itemNo', name: "Items", sortable: true},
      // {key: 'buisnessId', name: "Buisness", 
      // formatter :<button style={{marginBottom: 0}} type = "button" className="btn btn-primary" onClick = {() => console.log(this)} > Item Details  </button>
    // }
    ];

    this.state = {
      rows: [],
      rowsToShow: [],
      pageOfItems: 1,
      itemsToShow: 10,
    };
  }
  componentDidMount(){
    // console.log("Data Table Props: ", this.props);
    let data = [], currData = {id: ''}, i = 1;
    db.collection('businesses').doc(this.props.data.id).collection('orders').where('status', '==', 'pendiente').get()
    .then(res => {
      // console.log(res)
      res.forEach((order, key) => {
        currData = order.data();
        currData.id = i++;
        currData.itemNo = order.data().items.length;
        currData.fName = order.data().userName.split(' ')[0];
        currData.lName = order.data().userName.split(' ')[1];
        data.push(currData);
      })
      this.setState({rows: data, rowsToShow: this.filterRows(data, 1, 10)});
    })

  }
  onChangePage = (pageOfItems) => {
    const { rows, itemsToShow } = this.state;
    if (pageOfItems) {
      const rowsToShow = this.filterRows(rows, pageOfItems, itemsToShow);
      this.setState({ rowsToShow, pageOfItems });
    }
  };

  filterRows = (originalRows, pageNumber, rowsOnPage) => {
    const rowsFrom = rowsOnPage * (pageNumber - 1);
    const rowsTo = rowsFrom + rowsOnPage;
    return originalRows.slice(rowsFrom, rowsTo);
  };

  onSorting = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      }
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    };
    const {
      rows, pageOfItems, itemsToShow,
    } = this.state;
    if (sortDirection !== 'NONE') {
      let sortRows = [...rows].sort(comparer);
      sortRows = this.filterRows(sortRows, pageOfItems, itemsToShow);
      this.setState({ rowsToShow: sortRows });
      return sortRows;
    }
    const sortRows = this.filterRows(rows, pageOfItems, itemsToShow);
    this.setState({ rowsToShow: sortRows });
    return sortRows;
  }
  
  
  render() {
    const { rows, itemsToShow, pageOfItems, rowsToShow, } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            {
              rows ?

              <DataPaginationTable
                heads={this.heads}
                rows={rowsToShow}
                onSorting={this.onSorting}
              />
            :   
            <div class="load">
              <div class="load__icon-wrap">
                <svg class="load__icon">
                  <path fill="#88C24E" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                </svg>
              </div>
            </div>
            }
            <Pagination
              itemsCount={rows.length}
              itemsToShow={itemsToShow}
              pageOfItems={pageOfItems}
              onChangePage={this.onChangePage}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
