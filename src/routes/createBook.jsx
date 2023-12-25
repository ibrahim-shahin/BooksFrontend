import React, { useState } from "react";

import NoImageSelected from "../assests/no-image-selected.jpg";

import LINK from '../assests/config';


function createBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState("");
  const [image, setImage] = useState(NoImageSelected)
  const categoriesList = ["romance", "science", "crime", "food", "adventure", "thriller", "fiction", "other"]
  const [error, setError] = useState(false);

  const createBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);
    formData.append("thumbnail", thumbnail);

    try {

      const response = await fetch(LINK + "api/books", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
        setError(false);
      } else {
        console.log("Failed to submit data.");
        setError(true);
      }
    }
    catch (error) {
      setError(true);
    }
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // If checked, add to the array
      setCategories((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      // If unchecked, remove from the array
      setCategories((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      console.log(URL.createObjectURL(e.target.files[0]))
      setThumbnail(e.target.files[0]);
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    setSlug(title.replace(/ /g, '-'))
  }

  return (
    <div>
      <h1>Create Book</h1>
      <p>
        This is where we use NodeJs, Express & MongoDB to add some data. The
        data below is going to get stored in a MongoDB database.
      </p>

      {submitted ? (
        <h3>Data submitted successfully!</h3>
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">
            <label>Upload Thumbnail</label>
            <img src={image} alt="preview image" />
            <input
              onChange={onImageChange}
              type="file" accept="image/gif, image/jpeg, image/png" />
          </div>
          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <div>
              <label>Stars</label>
              <select value={stars} onChange={(e) => setStars(e.target.value)}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="checkbox-container">
              <label>
                Categories (check the related categories)
              </label>
              <div className="checkbox-group">
                {categoriesList.map((item, index) => (
                  <label key={item} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={item}
                      checked={categories.includes(item)}
                      onChange={handleCategoryChange}
                      className="checkbox-input"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <input type="submit" />
            {error && <p className="error">Please fill all the inputs</p>}
          </div>
        </form>
      )}
    </div>
  );
}

export default createBook;
