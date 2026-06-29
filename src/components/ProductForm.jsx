// นำเข้า useState จาก React ใช้เก็บและอัปเดตข้อมูลในฟอร์ม
import { useState } from "react";

// ค่าเริ่มต้นของฟอร์ม — ใช้ซ้ำตอน reset หลัง submit สำเร็จ
const INITIAL_FORM_DATA = {
  name: "",
  image: "",
  price: "",
  description: "",
  email: "",
};

function ProductForm() {
  // state เก็บค่าที่ผู้ใช้พิมพ์ในแต่ละ input (Controlled Component)
  // เมื่อค่าเปลี่ยน React จะ render หน้าใหม่ให้ input แสดงค่าล่าสุด
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // state เก็บข้อความ error ของแต่ละ field เช่น { name: "Name is required." }
  const [errors, setErrors] = useState({});

  // เรียกทุกครั้งที่ผู้ใช้พิมพ์ใน input หรือ textarea
  const handleChange = (event) => {
    const { name, value } = event.target; // name = ชื่อ field, value = ค่าที่พิมพ์
    // อัปเดตเฉพาะ field ที่เปลี่ยน โดยคงค่า field อื่นไว้ด้วย ...prev
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ตรวจสอบความถูกต้องของข้อมูล คืนค่า object ของ error (ว่าง = ผ่านทุกข้อ)
  const validate = () => {
    const newErrors = {};

    // trim() ตัดช่องว่างหัวท้าย — ถ้าเหลือว่างถือว่ายังไม่ได้กรอก
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image is required.";
    }

    // price เป็น string จาก input — ต้องเช็คว่างก่อน แล้วค่อยแปลงเป็นตัวเลข
    if (formData.price === "") {
      newErrors.price = "Price is required.";
    } else if (Number(formData.price) < 0) {
      newErrors.price = "Price cannot be less than 0.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      // regex ตรวจรูปแบบอีเมลพื้นฐาน เช่น test@example.com
      newErrors.email = "Invalid email format.";
    }

    return newErrors;
  };

  // เรียกเมื่อกดปุ่ม Submit (type="submit")
  const handleSubmit = (event) => {
    // ป้องกัน browser reload หน้าเว็บตามพฤติกรรม default ของ form
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors); // แสดง error ใต้ input ที่ไม่ผ่าน

    // ไม่มี key ใน newErrors = validation ผ่านทั้งหมด
    if (Object.keys(newErrors).length === 0) {
      const data = {
        name: formData.name,
        price: Number(formData.price), // แปลง price เป็นตัวเลขตามโจทย์
        image: formData.image,
        description: formData.description,
        email: formData.email,
      };

      // alert แสดงข้อมูลเป็น JSON string บนเว็บไซต์
      alert(JSON.stringify(data, null, 2));

      // ล้างค่าในทุก input และ error หลัง submit สำเร็จ
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
    }
  };

  return (
    // onSubmit ผูกกับ handleSubmit แทนการ reload หน้า
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>

      {/* Controlled input: value มาจาก state, onChange อัปเดต state */}
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
        {/* แสดง error เฉพาะเมื่อ errors.name มีค่า (truthy) */}
        {errors.name && <p className="error-message">{errors.name}</p>}
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
        {errors.image && <p className="error-message">{errors.image}</p>}
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
        {errors.price && <p className="error-message">{errors.price}</p>}
      </div>

      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter description here"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            cols={30}
          />
        </label>
        {errors.description && (
          <p className="error-message">{errors.description}</p>
        )}
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
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default ProductForm;
