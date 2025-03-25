import { useState, useEffect } from 'react';
import * as watchListService from '../../services/watchListService'

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData);
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text"><h4>Your comment:</h4></label>
      <textarea
        required
        type="text"
        name="text"
        id="text"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
};

export default CommentForm;