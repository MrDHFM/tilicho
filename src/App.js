import './App.css';
import TableComponent from './components/Table/TableComponent';


const initialData = [
  {
    key: '1',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-12-23',
    endDate: '2024-01-23',
    status: 'Active',
    enable: true,
    id: '5GH5460300',
  },
  {
    key: '2',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-06-02',
    endDate: '2023-07-02',
    status: 'Inactive',
    enable: false,
    id: '5GH5460301'
  },
  {
    key: '3',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-06-03',
    endDate: '2023-07-03',
    status: 'Archived',
    enable: true,
    id: '5GH5460303'
  },
  {
    key: '4',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-06-04',
    endDate: '2023-07-04',
    status: 'Expired',
    enable: true,
    id: '5GH5460304'
  },
  {
    key: '5',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-06-06',
    endDate: '2023-07-06',
    status: 'Active',
    enable: true,
    id: '5GH5460305'
  },
  {
    key: '6',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-06-06',
    endDate: '2023-07-06',
    status: 'Active',
    enable: true,
    id: '5GH5460306'
  },
  {
    key: '7',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-06-06',
    endDate: '2023-07-06',
    status: 'Inactive',
    enable: true,
    id: '5GH5460307'
  },
  {
    key: '8',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-06-06',
    endDate: '2023-07-06',
    status: 'Expired',
    enable: true,
    id: '5GH5460308'
  },
  {
    key: '9',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-06-06',
    endDate: '2023-07-06',
    status: 'Active',
    enable: true,
    id: '5GH5460309'
  },
  {
    key: '10',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-06-06',
    endDate: '2023-07-06',
    status: 'Active',
    enable: false,
    id: '5GH5460310',
  },
  {
    key: '11',
    campaignName: 'Christmas Festival Offer',
    client: 'Coke',
    brand: 'Fanta',
    startDate: '2023-06-06',
    endDate: '2023-07-06',
    status: 'Active',
    enable: true,
    id: '5GH5460311',
  },
  // Add more data as needed
];

const statusStyles = {
  Active: {
    backgroundColor: '#b7eb8f',
    color:'#092b00',
    padding: '5px 12px',
    borderRadius: '20px',
    border: '1px solid lightgreen'
  },
  Inactive: {
    backgroundColor: 'lightgray',
    padding: '5px 12px',
    borderRadius: '20px',
    border: '1px solid lightgray'
  },
  Archived: {
    backgroundColor: '#bae0ff',
    color:"##001d66",
    padding: '5px 12px',
    borderRadius: '20px',
    border: '1px solid lightblue'
  },
  Expired: {
    backgroundColor: '#ffccc7',
    color:'#f5222d',
    padding: '5px 12px',
    borderRadius: '20px',
    border: '1px solid #ffa39e'
  },
};

const statusOptions = ['Active', 'Inactive', 'Archived', 'Expired'];

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px',marginTop:'50px'
     }}>
      <TableComponent  initialData={initialData}
    statusOptionsProp={statusOptions}
    statusStyles={statusStyles} />
    </div>
  );
}

export default App;
