import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './survey.css'; // Import your CSS file for styling

function SurveyDepartmentPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:5000/api/sellerDetails');
            setProperties(response.data); // Store all properties
            setFilteredProperties(response.data); // Initialize filteredProperties
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        setSearchQuery(searchQuery);

        const updatedProperties = properties.filter(property =>
            property.surveyNumber.toLowerCase().includes(searchQuery)
        );
        setFilteredProperties(updatedProperties);
    };

    const handleApprove = async (propertyId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/approveSeller', { sellerId: propertyId });
            console.log('Seller approved:', response.data);

            setFilteredProperties(filteredProperties.filter(property => property._id !== propertyId));
        } catch (error) {
            console.error('Error approving seller:', error);
            setError('Failed to approve seller. Please try again.');
        }
    };

    const handleDisapprove = async (propertyId) => {
        try {
            console.log(`Attempting to disapprove seller with ID: ${propertyId}`);
            const response = await axios.post('http://localhost:5000/api/disapproveSeller', { sellerId: propertyId });
            console.log('Seller disapproved and removed:', response.data);

            setFilteredProperties(filteredProperties.filter(property => property._id !== propertyId));
        } catch (error) {
            console.error('Error disapproving seller:', error);
            setError('Failed to disapprove seller. Please try again.');
        }
    };

    return (
        <div className="main-container">
            <h1 className="survey-title">Survey Department</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Survey Number"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <Link to="/surveyorlogin"><button className="signout-button">Sign Out</button></Link>
            <div className="properties-list">
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!isLoading && filteredProperties.map(property => (
                    <div key={property._id} className="property-item">
                        <img className="property-image" src={`http://localhost:5000/${property.imageUpload}`} alt="Land" />
                        <h2>{property.ownerName}</h2>
                        <p><strong>Address:</strong> {property.locality}</p>
                        <p><strong>Details:</strong> {property.landStatus}</p>
                        <p><strong>Survey Number:</strong> {property.surveyNumber}</p>
                        <p><strong>Registration Number:</strong> {property.registrationNumber}</p>
                        <p><strong>Number of Acres:</strong> {property.acres}</p>
                        <div className="approval-buttons">
                            <button className="approve-button" onClick={() => handleApprove(property._id)}>Approve</button>
                            <button className="disapprove-button" onClick={() => handleDisapprove(property._id)}>Disapprove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SurveyDepartmentPage;
