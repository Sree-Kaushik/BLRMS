import React, { useState } from 'react';
import Header from './header';
import './sellerdetails.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SellerDetails() {
    const [formData, setFormData] = useState({
        ownerName: '',
        acres: '',
        registrationNumber: '',
        landPrice: '',
        locality: '',
        surveyNumber: '',
        landStatus: '',
        imageUpload: null // Store the image file object
    });
    const [imagePreview, setImagePreview] = useState(null); // State for image preview

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('ownerName', formData.ownerName);
            formDataToSend.append('acres', formData.acres);
            formDataToSend.append('registrationNumber', formData.registrationNumber);
            formDataToSend.append('landPrice', formData.landPrice);
            formDataToSend.append('locality', formData.locality);
            formDataToSend.append('surveyNumber', formData.surveyNumber);
            formDataToSend.append('landStatus', formData.landStatus);
            formDataToSend.append('imageUpload', formData.imageUpload); // Append image file

            await axios.post('http://localhost:5000/api/sellerDetails', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('Seller details submitted successfully');
            navigate('/surveyfinance'); // Redirect to the next page
        } catch (error) {
            alert('Failed to submit seller details: ' + error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, imageUpload: file }); // Set the image file in formData
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set image preview
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                )}
                <h1>Land Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label" htmlFor="ownerName">Owner Name:</label>
                        <input
                            type="text"
                            id="ownerName"
                            name="ownerName"
                            className="input"
                            placeholder="Enter owner's name"
                            onChange={handleChange}
                            value={formData.ownerName}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="acres">Number of Acres:</label>
                        <input
                            type="number"
                            id="acres"
                            name="acres"
                            className="input"
                            placeholder="Enter number of acres"
                            onChange={handleChange}
                            value={formData.acres}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="registrationNumber">Registration Number:</label>
                        <input
                            type="text"
                            id="registrationNumber"
                            name="registrationNumber"
                            className="input"
                            placeholder="Enter registration number"
                            onChange={handleChange}
                            value={formData.registrationNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="landPrice">Land Price:</label>
                        <input
                            type="text"
                            id="landPrice"
                            name="landPrice"
                            className="input"
                            placeholder="Enter land price"
                            onChange={handleChange}
                            value={formData.landPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="locality">Locality:</label>
                        <input
                            type="text"
                            id="locality"
                            name="locality"
                            className="input"
                            placeholder="Enter locality"
                            onChange={handleChange}
                            value={formData.locality}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="surveyNumber">Survey Number:</label>
                        <input
                            type="text"
                            id="surveyNumber"
                            name="surveyNumber"
                            className="input"
                            placeholder="Enter survey number"
                            onChange={handleChange}
                            value={formData.surveyNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="landStatus">Land Status:</label>
                        <input
                            type="text"
                            id="landStatus"
                            name="landStatus"
                            className="input"
                            placeholder="Enter land status"
                            onChange={handleChange}
                            value={formData.landStatus}
                        />
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="imageUpload">Upload Image:</label>
                        <input
                            type="file"
                            id="imageUpload"
                            name="imageUpload"
                            className="input"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </>
    );
}

export default SellerDetails;
