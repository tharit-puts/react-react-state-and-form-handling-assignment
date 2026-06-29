import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!formData.image.trim()) {
    errors.image = "Image is required.";
  }

  if (formData.price === "" || formData.price === null) {
    errors.price = "Price is required.";
  } else if (Number(formData.price) < 0) {
    errors.price = "Price cannot be less than 0.";
  }

  if (!formData.description.trim()) {
    errors.description = "Description is required.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(formData.email.trim())) {
    errors.email = "Invalid email format.";
  }

  return errors;
}

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const product = {
      name: formData.name.trim(),
      price: Number(formData.price),
      image: formData.image.trim(),
      description: formData.description.trim(),
      email: formData.email.trim(),
    };
    alert(JSON.stringify(product, null, 2));
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
        {errors.image && <p className="error">{errors.image}</p>}
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        {errors.price && <p className="error">{errors.price}</p>}
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            cols={30}
          />
        </label>
        {errors.description && <p className="error">{errors.description}</p>}
      </div>
      <div className="input-container">
        <label>
          User's email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email here"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default ProductForm;
