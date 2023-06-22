import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export async function createUser(body) {
  try {
    await axios.post('/user', body);

  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getUsers() {
  try {
    const { data: { users} } = await axios.get('/user');

    return users;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createDepartment(body) {
  try {
    await axios.post('/department', body);

  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getDepartments() {
  try {
    const { data } = await axios.get('/department');

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}