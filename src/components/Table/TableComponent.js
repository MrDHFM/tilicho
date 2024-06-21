import React, { useState,useMemo } from 'react';
import { Table, Input, Button, Dropdown, Menu, Switch, Space,Select ,Pagination} from 'antd';
import { SearchOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons';
import moment from 'moment';

import "./TableComponent.css"


const { Search } = Input;
const { Option } = Select;

// Sample data
// const initialData = [
//   {
//     key: '1',
//     campaignName: 'Campaign 1',
//     client: 'Client A',
//     brand: 'Brand X',
//     startDate: '2023-06-01',
//     endDate: '2023-07-01',
//     status: 'Active',
//     enable: true,
//   },
//   {
//     key: '2',
//     campaignName: 'Campaign 2',
//     client: 'Client B',
//     brand: 'Brand B',
//     startDate: '2023-06-02',
//     endDate: '2023-07-02',
//     status: 'Inactive',
//     enable: false,
//   },
//   {
//     key: '3',
//     campaignName: 'Campaign 3',
//     client: 'Client C',
//     brand: 'Brand C',
//     startDate: '2023-06-03',
//     endDate: '2023-07-03',
//     status: 'Archived',
//     enable: true,
//   },
//   {
//     key: '4',
//     campaignName: 'Campaign 4',
//     client: 'Client D',
//     brand: 'Brand D',
//     startDate: '2023-06-04',
//     endDate: '2023-07-04',
//     status: 'Expired',
//     enable: true,
//   },
//   {
//     key: '5',
//     campaignName: 'Campaign E',
//     client: 'Client E',
//     brand: 'Brand E',
//     startDate: '2023-06-06',
//     endDate: '2023-07-06',
//     status: 'Active',
//     enable: false,
//   },
//   {
//     key: '6',
//     campaignName: 'Campaign E',
//     client: 'Client E',
//     brand: 'Brand E',
//     startDate: '2023-06-06',
//     endDate: '2023-07-06',
//     status: 'Active',
//     enable: false,
//   },
//   {
//     key: '7',
//     campaignName: 'Campaign E',
//     client: 'Client E',
//     brand: 'Brand E',
//     startDate: '2023-06-06',
//     endDate: '2023-07-06',
//     status: 'Active',
//     enable: false,
//   },
//   {
//     key: '8',
//     campaignName: 'Campaign E',
//     client: 'Client E',
//     brand: 'Brand E',
//     startDate: '2023-06-06',
//     endDate: '2023-07-06',
//     status: 'Active',
//     enable: false,
//   },
//   {
//     key: '9',
//     campaignName: 'Campaign E',
//     client: 'Client E',
//     brand: 'Brand E',
//     startDate: '2023-06-06',
//     endDate: '2023-07-06',
//     status: 'Active',
//     enable: false,
//   },
//   {
//     key: '10',
//     campaignName: 'Campaign E',
//     client: 'Client E',
//     brand: 'Brand E',
//     startDate: '2023-06-06',
//     endDate: '2023-07-06',
//     status: 'Active',
//     enable: false,
//   },
//   {
//     key: '11',
//     campaignName: 'Campaign E',
//     client: 'Client E',
//     brand: 'Brand E',
//     startDate: '2023-06-06',
//     endDate: '2023-07-06',
//     status: 'Active',
//     enable: false,
//   },
//   // Add more data as needed
// ];

// Sample status options
//const statusOptions = ['Active', 'Inactive', 'Archived', 'Expired'];

const TableComponent = ({ initialData, statusOptionsProp ,statusStyles }) => {

    const [filteredData, setFilteredData] = useState(initialData);
    const [searchText, setSearchText] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState('All');

  
    const handleSearch = (value) => {
      const filtered = initialData.filter(item =>
        Object.keys(item).some(key =>
          String(item[key]).toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredData(filtered);
      setSearchText(value);
    };
  
    const handleStatusFilter = (status) => {
        setSelectedStatus(status);
        if (status === 'All') {
          setFilteredData(initialData);
        } else {
          const filtered = initialData.filter(item => item.status === status);
          setFilteredData(filtered);
        }
      };
  
    const handleClearFilter = () => {
      setFilteredData(initialData);
      setSelectedStatus('All');
    };


  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    const menu = (
        <Menu>
          <Menu.Item key="1">Action 1</Menu.Item>
          <Menu.Item key="2">Action 2</Menu.Item>
          <Menu.Item key="3">Action 3</Menu.Item>
        </Menu>
      );
    
      const tableColumns = [
        {
          title: 'Campaign Name' ,
          dataIndex: 'campaignName',
          key: 'campaignName',
          fixed: 'left',
          render: (text, record) => (
            <Space direction="vertical">
              <span style={{ fontWeight:"bold" }} >{text}</span>
              <span style={{ color: 'gray', fontSize: '12px' }}>{record.id}</span>
            </Space>
          ),
        },
        {
          title: 'Client',
          dataIndex: 'client',
          key: 'client',
          sorter: (a, b) => a.client.localeCompare(b.client),
        },
        {
          title: 'Brand',
          dataIndex: 'brand',
          key: 'brand',
          sorter: (a, b) => a.brand.localeCompare(b.brand),
        },
        {
          title: 'Start Date',
          dataIndex: 'startDate',
          key: 'startDate',
          sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
          render: (text) => moment(text).format('MMM DD, YYYY'),
        },
        {
          title: 'End Date',
          dataIndex: 'endDate',
          key: 'endDate',
          sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
          render: (text) => moment(text).format('MMM DD, YYYY'),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          sorter: (a, b) => a.status.localeCompare(b.status),
          render: (status) => (
            <span style={statusStyles[status]}>
              {status}
            </span>
          ),
        },
        {
          title: 'Enable/Disable',
          dataIndex: 'enable',
          key: 'enable',
          render: (text, record) => <Switch checked={record.enable} />,
        },
        {
          title: 'Actions',
          key: 'actions',
          render: () => (
            <Dropdown overlay={menu} trigger={['click']}>
              <MoreOutlined />
            </Dropdown>
          ),
        },
      ];

      const statusCounts = useMemo(() => {
        const counts = { All: initialData.length };
        statusOptionsProp.forEach(status => {
          counts[status] = initialData.filter(item => item.status === status).length;
        });
        return counts;
      }, [initialData, statusOptionsProp]);

      const paginationProps = {
        pageSize,
        //showSizeChanger: true,
        onShowSizeChange: handlePageSizeChange,
        showTotal: (total, range) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Items per page: </span>
            <Select
              defaultValue={pageSize}
              onChange={handlePageSizeChange}
              style={{ marginLeft: 8 }}
            >
              {['10', '20', '50', '100'].map(size => (
                <Select.Option key={size} value={parseInt(size)}>
                  {size}
                </Select.Option>
              ))}
            </Select>
          </div>
        ),
      };

      const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  return (
         <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Search
          placeholder="Search"
          onSearch={handleSearch}
          style={{ width: 200 }}
          allowClear
        />
        <div>
        <Button onClick={() => handleStatusFilter('All')} style={{ backgroundColor: selectedStatus === 'All' ? '#1890ff' : '',color: selectedStatus === 'All' ? '#fff' : '',padding: '5px 12px',borderRadius: '20px',marginRight: '8px' }}
 >
            All ({statusCounts.All})
          </Button>
          {statusOptionsProp.map(status => (
            <Button key={status} onClick={() => handleStatusFilter(status)} style={{ backgroundColor: selectedStatus === status ? '#1890ff' : '',color: selectedStatus === status ? '#fff' : '',padding: '5px 12px',borderRadius: '20px',marginRight: '8px' }}
            >
              {status}({statusCounts[status]})
            </Button>
          ))}
          <Button icon={<FilterOutlined />} onClick={handleClearFilter} />
        </div>
      </div>
      <Table
        columns={tableColumns}
        dataSource={paginatedData}
        rowSelection={{ type: 'checkbox' }}
        pagination = {false}
      />

<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <div>
          <span style={{ marginRight: '8px' }}>Items per page:</span>
          <Select
            defaultValue={pageSize}
            onChange={handlePageSizeChange}
            style={{ width: 80 }}
          >
            {['10', '20', '50', '100'].map(size => (
              <Option key={size} value={parseInt(size)}>
                {size}
              </Option>
            ))}
          </Select>
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        </div>
    </div>
  )
}

export default TableComponent