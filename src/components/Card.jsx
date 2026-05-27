import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { addFavorite, removeFavorite } from "../store.js";

export const Card = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();

    const isFavorite = store.favorites.find((fav) => fav.name === item.name);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavorite(dispatch, item.name);
        } else {
            addFavorite(dispatch, { ...item, type: type });
        }
    };

    const placeholderImage = "https://placehold.co/400x300/1a1a1a/a3a3a3?text=Star+Wars";

    return (
        <div 
            className="card bg-dark text-light border-0 flex-shrink-0" 
            style={{ 
                width: "18rem", 
                marginRight: "1.5rem",
                boxShadow: "0 4px 8px rgba(0, 123, 255, 0.3)", 
                transition: "transform 0.2s"
            }}
        >
            <img 
                src={placeholderImage} 
                className="card-img-top" 
                alt={item.name}
                style={{ height: "250px", objectFit: "cover", objectPosition: "center" }}
            />
            
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{item.name}</h5>
                
                <div className="mt-auto pt-3 d-flex justify-content-between align-items-center">
                    
                    {/* Detalles */}
                    <Link 
                        to={`/single/${type}/${item.uid}`} 
                        className="btn btn-outline-light"
                        style={{ borderColor: "#007bff", color: "#007bff" }} 
                    >
                        Learn more!
                    </Link>

                    {/* Favorito */}
                    <button 
                        className="btn btn-outline-warning" 
                        onClick={handleFavoriteClick}
                        style={{ border: "none", fontSize: "1.2rem" }}
                    >
                        <i className={isFavorite ? "fas fa-heart text-warning" : "far fa-heart text-warning"}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};