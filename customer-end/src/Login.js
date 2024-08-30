import axios from 'axios';

async function login() {
  try {
    const res = await axios.get('/tokenauth', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    });
    console.log(res.data.username);
    console.log(res.data.success);
    return res.data; // Return the full data object
  } catch (err) {
    console.log(err);
    return { success: false }; // Return a consistent shape
  }
}

export default login;
