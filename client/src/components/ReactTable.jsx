// import axios from 'axios';
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator";
import { Row } from 'react-bootstrap';

export default function ReactTable({title, pageSize, data, columns}) {
  const paginationOptions = {
    custom: true,
    sizePerPage: pageSize,
    totalSize: data.length
  };

  return (
    <>
      <Row className="h-100 px-lg-5 pt-4 d-flex flex-column">
        <h3 className="text-center fs-1 mb-3 text-capitalize">{title}</h3>
        <div style={{ color: '#4682B4' }} className='overflow-auto'>
          <PaginationProvider pagination={paginationFactory(paginationOptions)} >
            {
              ({ paginationProps, paginationTableProps }) => (
                <div>
                  <PaginationListStandalone {...paginationProps} />
                  <BootstrapTable
                    keyField="_id"
                    data={data}
                    columns={columns}
                    {...paginationTableProps}
                    hover
                  />
                </div>
              )
            }
          </PaginationProvider>
        </div>
        <p className="m-0"> <span style={{ fontWeight: 'bold', color: 'red'}}>Note:</span>  You can sort by Name and Status</p>
      </Row>
    </>
  )
}
