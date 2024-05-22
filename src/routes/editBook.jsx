import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LINK from '../assests/config';

function editBook() {
  const navigate = useNavigate();
  const urlSlug = useParams();
  const baseUrl = `${LINK}api/books/${urlSlug.slug}`;

  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState("");
  const [image, setImage] = useState("");
  const categoriesList = ["romance", "science", "crime", "food", "adventure", "thriller", "fiction", "other"]

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setBookId(data._id);
      setTitle(data.title);
      setSlug(data.slug);
      setStars(data.stars);
      setCategories(data.category);
      setDescription(data.description);
      setThumbnail(data.thumbnail);
      console.log(categories)
    } catch (error) { }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bookId", bookId);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch(LINK + "api/books", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
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
      setThumbnail(e.target.files[0]);
    }
  };

  const removeBook = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        LINK + "api/books/" + bookId,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        navigate("/books");
        console.log("Book removed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    setSlug(title.replace(/ /g, '-'))
  }

  return (
    <div>
      <h1>Edit Book</h1>
      <p>
        This is where we use NodeJs, Express & MongoDB to grab some data. The
        data below is pulled from a MongoDB database.
      </p>

      {submitted ? (
        <p>Data subitted successfully!</p>
      ) : (
        <>
          <button onClick={removeBook} class="delete"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
          <form className="bookdetails" onSubmit={createBook}>
            <div className="col-1">
              <label>Upload Thumbnail</label>

              {image ? (
                <img src={`${image}`} alt="preview image" />
              ) : (
                <img
                  src={`${LINK}uploads/${thumbnail}`}
                  alt="preview image"
                />
              )}
              <input
                onChange={onImageChange}
                type="file"
                accept="image/gif, image/jpeg, image/png"
              />
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
                    <option key={index} value={index}
                      selected={stars == index}>
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
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default editBook;
