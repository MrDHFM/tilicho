import React, { useState,useMemo } from 'react';
import { Table, Input, Button, Dropdown, Menu, Switch, Space,Select ,Pagination} from 'antd';
import { SearchOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons';
import moment from 'moment';

import "./TableComponent.css"


const { Search } = Input;
const { Option } = Select;


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

  const getMenu = (record) => {
    const actions = [];
   
    actions.push(<Menu.Item key="view">View</Menu.Item>);
    if (record.status !== 'Archived') {
      actions.push(<Menu.Item key="edit">Edit</Menu.Item>);
    }
    actions.push(<Menu.Item key="archive">{record.status === 'Archived' ? 'Unarchive' : 'Archive'}</Menu.Item>);
    actions.push(<Menu.Item key="changelogs">Changelogs</Menu.Item>);
   
    
    return <Menu>{actions}</Menu>;
  };
    
      const tableColumns = [
        {
          title: 'Campaign Name' ,
          dataIndex: 'campaignName',
          key: 'campaignName',
          fixed: 'left',
          sorter: (a, b) => a.client.localeCompare(b.id),
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
          render: (text, record) => (
            <Dropdown  overlay={getMenu(record)} trigger={['click']}>
              <Button icon={<MoreOutlined />} style={{ border:"none", background:"inherit" }} />
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