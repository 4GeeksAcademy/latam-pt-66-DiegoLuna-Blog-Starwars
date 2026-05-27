import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const Single = () => {
    const { type, theId } = useParams();

    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}/${theId}`);
                if (response.ok) {
                    const data = await response.json();
                    setDetails(data.result.properties);
                }
            } catch (error) {
                console.error("Error al cargar los detalles:", error);
            }
        };

        fetchDetails();
    }, [type, theId]);

    const placeholderImage = "https://placehold.co/800x600/1a1a1a/a3a3a3?text=Star+Wars+Databank";

    return (
        <div className="container mt-5 pb-5 text-light">
            {!details ? (
                <div className="text-center mt-5">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div 
                    className="card bg-dark border-0 p-4 p-md-5 rounded-4" 
                    style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.8)" }}
                >
                    <div className="row mb-5 align-items-center">
                        <div className="col-md-5 text-center mb-4 mb-md-0">
                            <img 
                                src={placeholderImage} 
                                alt={details.name} 
                                className="img-fluid rounded-3" 
                                style={{ 
                                    border: "2px solid #333", 
                                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)" 
                                }} 
                            />
                        </div>
                        <div className="col-md-7 px-md-4">
                            <h1 className="display-4 fw-bold text-warning mb-4" style={{ textShadow: "0 0 15px rgba(255, 193, 7, 0.4)" }}>
                                {details.name}
                            </h1>
                            <p className="fs-5 text-white-50" style={{ lineHeight: "1.8" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </div>
                    </div>

                    <hr 
                        className="my-5" 
                        style={{ 
                            borderTop: "2px solid #dc3545", 
                            opacity: 0.8, 
                            boxShadow: "0 0 10px #dc3545" 
                        }} 
                    />

                    <div className="row text-center justify-content-center mb-5">
                        {Object.entries(details)
                            .filter(([key]) => !['url', 'homeworld', 'created', 'edited'].includes(key))
                            .slice(0, 6)
                            .map(([key, value]) => (
                                <div key={key} className="col-6 col-md-4 col-lg-2 mb-4">
                                    <div 
                                        className="p-3 h-100 rounded-3 d-flex flex-column justify-content-center" 
                                        style={{ 
                                            backgroundColor: "#111", 
                                            border: "1px solid rgba(220, 53, 69, 0.4)", 
                                            boxShadow: "inset 0 0 15px rgba(220, 53, 69, 0.1), 0 0 10px rgba(220, 53, 69, 0.2)"
                                        }}
                                    >
                                        <h6 
                                            className="fw-bold text-danger mb-2" 
                                            style={{ fontSize: "0.75rem", letterSpacing: "2px" }}
                                        >
                                            {key.replace('_', ' ').toUpperCase()}
                                        </h6>
                                        <span className="text-white fw-bold fs-5 text-break">
                                            {value}
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    
                    <div className="text-center">
                        <Link 
                            to="/" 
                            className="btn btn-outline-warning px-4 py-2 fw-bold rounded-pill" 
                            style={{ letterSpacing: "1px" }}
                        >
                            <i className="fas fa-arrow-left me-2"></i> RETURN TO GALAXY
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};