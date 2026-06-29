import { useState } from "react";

function ProductForm() {
    const [formData, setFormData] = useState({ name:"", image: "", price: "", description: "", email: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateForm() {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!formData.image.trim()) {
            newErrors.image = "Image is required.";
        }

        if (!formData.price) {
            newErrors.price = "Price is required.";
        } else if (Number(formData.price) < 0) {
            newErrors.price = "Price cannot be less than 0.";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const data = {
            name: formData.name,
            image: formData.image,
            price: formData.price,
            description: formData.description,
            email: formData.email
        };

        alert(JSON.stringify(data));
    };

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
        {errors.name && <p style={{ color: "red", border: "1px solid red", padding: "4px 8px", borderRadius: "4px", display: "inline-block", marginTop: "6px" }}>{errors.name}</p>}
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
        {errors.image && <p style={{ color: "red", border: "1px solid red", padding: "4px 8px", borderRadius: "4px", display: "inline-block", marginTop: "6px" }}>{errors.image}</p>}
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
        {errors.price && <p style={{ color: "red", border: "1px solid red", padding: "4px 8px", borderRadius: "4px", display: "inline-block", marginTop: "6px" }}>{errors.price}</p>}
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
        {errors.description && <p style={{ color: "red", border: "1px solid red", padding: "4px 8px", borderRadius: "4px", display: "inline-block", marginTop: "6px" }}>{errors.description}</p>}
      </div>
      <div className="input-container">
        <label>
          User's email
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email here"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <p style={{ color: "red", border: "1px solid red", padding: "4px 8px", borderRadius: "4px", display: "inline-block", marginTop: "6px" }}>{errors.email}</p>}
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default ProductForm;
