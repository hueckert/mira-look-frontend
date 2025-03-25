const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/watch-list`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

const show = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (movieFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (movieId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteMovie = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
  
export { index, show, create, createComment,deleteMovie };