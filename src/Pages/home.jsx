import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '/Users/cadou/Desktop/tabella/eserciziotabella/src/Pages/home.css';
function Home() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: '', region: '', country: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/data'); // Assuming your JSON Server is running on localhost:3000
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/data', formData);
      setData([...data, response.data]); // Add the newly created data to the existing data array
      setFormData({ name: '', region: '', country: '' }); // Reset form fields
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:3001/data/${id}`);
      setData(data.filter(item => item.id !== id)); // Remove the deleted item from the data array
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  
  const handleEdit = item => {
    setIsEditing(true);
    setFormData(item);
  };
  
  return (
    <>
      <h2>Data from DB</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Region:
          <input type="text" name="region" value={formData.region} onChange={handleChange} />
        </label>
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </label>
        <button type="submit">Add Row</button>
      </form>

      <table className="table-container">
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{isEditing && item.id === formData.id ? (
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              ) : (
                item.name
              )}</td>
              <td>{isEditing && item.id === formData.id ? (
                <input type="text" name="region" value={formData.region} onChange={handleChange} />
              ) : (
                item.region
              )}</td>
              <td>{isEditing && item.id === formData.id ? (
                <input type="text" name="country" value={formData.country} onChange={handleChange} />
              ) : (
                item.country
              )}</td>
              <td>
                {isEditing && item.id === formData.id ? (
                  <button onClick={handleSubmit}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Home;

