import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  border: '1px solid gray',
  borderRadius: '15px',
  margin: '15px',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

const Vacancy = () => {
  const [vacancies, setVacancies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  useEffect(() => {
    fetch('https://670f57f23e71518616576ea4.mockapi.io/api/users')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(user => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          vacancyName: user.vacancyName || 'N/A',
          companyName: user.companyName || 'N/A',
          status: user.status
        }));
        setVacancies(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleStatusChange = (id) => {
    setVacancies((prevVacancies) =>
      prevVacancies.map((vacancy) =>
        vacancy.id === id ? { ...vacancy, status: !vacancy.status } : vacancy
      )
    );
  };

  const handleDelete = (id) => {
    setVacancies((prevVacancies) => prevVacancies.filter((vacancy) => vacancy.id !== id));
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Highlight matching search terms
  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <span key={index} style={{ backgroundColor: 'rgba(0, 190, 219, 0.4)' }}>{part}</span> : part
    );
  };

  // Filter vacancies based on search term
  const filteredVacancies = vacancies.filter((vacancy) =>
    ['name', 'email', 'vacancyName', 'companyName'].some((key) =>
      vacancy[key].toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredVacancies.length / rowsPerPage);
  const displayedVacancies = filteredVacancies.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className='h-[600px] m-2.5 flex flex-col'>
      <TextField
        placeholder='Search by Name, Email, Vacancy and Company'
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      
      <table className='border-collapse w-full border-b border-b-gray-300'>
        <thead className='table-head'>
          <tr>
            <th className='h-[50px] text-2xl p-2.5 border border-0.5 border-gray-300'>Name</th>
            <th className='h-[50px] text-2xl p-2.5 border border-0.5 border-gray-300'>Email</th>
            <th className='h-[50px] text-2xl p-2.5 border border-0.5 border-gray-300'>Vacancy</th>
            <th className='h-[50px] text-2xl p-2.5 border border-0.5 border-gray-300'>Company Name</th>
            <th className='h-[50px] text-2xl p-2.5 border border-0.5 border-gray-300'>Status</th>
            <th className='h-[50px] text-2xl p-2.5 border border-0.5 border-gray-300'>Action</th>
          </tr>
        </thead>
        <tbody className='table-row-group'>
        {displayedVacancies.length > 0 ? (
            displayedVacancies.map((vacancy) => (
              <tr key={vacancy.id} className='h-auto border-r border-gray-300'>
                <td className='text-start text-xl p-6 border-l border-r border-gray-300'>{highlightText(vacancy.name, searchTerm)}</td>
                <td className='text-start text-xl p-6 border-l border-r border-gray-300'>{highlightText(vacancy.email, searchTerm)}</td>
                <td className='text-start text-xl p-6 border-l border-r border-gray-300'>{highlightText(vacancy.vacancyName, searchTerm)}</td>
                <td className='text-start text-xl p-6 border-l border-r border-gray-300'>{highlightText(vacancy.companyName, searchTerm)}</td>
                <td className='text-start text-xl p-6 border-l border-r border-gray-300' style={{ textAlign: 'center' }}>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        className='status-icon'
                        checked={vacancy.status}
                        onChange={() => handleStatusChange(vacancy.id)}
                      />
                    }
                    label={vacancy.status ? "Active" : "Inactive"}
                  />
                </td>
                <td className='flex gap-5 items-center justify-center p-7 border-0'>
                  <RemoveRedEyeOutlinedIcon titleAccess='View' className="cursor-pointer" />
                  <EditOutlinedIcon titleAccess='Edit' className="cursor-pointer" />
                  <DeleteOutlineOutlinedIcon 
                    titleAccess='Delete'
                    onClick={() => handleDelete(vacancy.id)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px', fontSize: '1.2rem' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {displayedVacancies.length > 0 && (
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        sx={{
          '& .Mui-selected': {
            backgroundColor: 'rgba(0, 190, 219, 0.8)' ,
          },
        }}
        className='flex justify-end mt-6'
      />
      )}
    </div>
  );
}

export default Vacancy;
