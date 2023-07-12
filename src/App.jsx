
import axios from 'axios';
import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function App() {
  const [personName, setPersonName] = React.useState([]);
  const [data, setData] = React.useState([]);
  // <-----------------To get Data from API---------------->
  React.useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setData(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };

  const [selectedUserIds, setSelectedUserIds] = React.useState([]);
  // <-----------------To show users details---------------->
  const showUsers = () => {
    const ids = personName.map((name) => {
      const user = data.find((item) => item.name === name);
      return user.id;
    });
    setSelectedUserIds(ids);
  };

  // <-----------------To uncheck the the Checked Option when User Details are removed---------------->
  const handleRemoveUser = (userId) => {
    const updatedIds = selectedUserIds.filter((id) => id !== userId);
    setSelectedUserIds(updatedIds);
  };

  // <-----------------To Remove a user details---------------->
  const handleRemoveCard = (userId) => {
    const updatedData = data.filter((user) => user.id !== userId);
    setData(updatedData);
    handleRemoveUser(userId);
  };

  return (
    <>
      <div className='m-1 d-flex row '>
        <div className='col-sm-6 col-12'>
          <FormControl sx={{ my: 1, width: "100%" }}>
            <InputLabel id='demo-multiple-checkbox-label'>
              Users
            </InputLabel>
            <Select
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label='Users' />}
              MenuProps={MenuProps}
              renderValue={(selected) => selected.join(', ')}
            >
              {data.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  <input
                    type='checkbox'
                    checked={personName.indexOf(item.name) > -1}
                  />
                  <label>{item.name}</label>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='mt-2 col-sm-6 col-12'>
          <button onClick={showUsers} className='btn btn-success text-light p-3 w-100 fw-bold'>
            Show Users Details
          </button>
        </div>
      </div>

      <div className='container-fluid row mt-4'>
        {data
          .filter((user) => selectedUserIds.includes(user.id))
          .map((user) => (
            <div key={user.id} className='col-md-4 mb-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{user.name}</h5>
                  <p className='card-text'>Email: {user.email}</p>
                  <p className='card-text'>Phone: {user.phone}</p>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleRemoveCard(user.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
