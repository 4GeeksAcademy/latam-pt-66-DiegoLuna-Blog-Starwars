import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { removeFavorite } from "../store.js";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <nav 
            className="navbar navbar-dark bg-dark px-4 mb-4 sticky-top" 
            style={{ 
                borderBottom: "2px solid #28a745", 
                boxShadow: "0 4px 15px rgba(40, 167, 69, 0.6)" 
            }}
        >
            <Link to="/" className="navbar-brand">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Star_wars2.svg" 
                    alt="Star Wars Logo" 
                    height="50" 
                    style={{ filter: "drop-shadow(0px 0px 5px rgba(255,255,255,0.5))" }}
                />
            </Link>

            <div className="ml-auto">
                <div className="dropdown">
                    <button 
                        className="btn btn-dark dropdown-toggle d-flex align-items-center gap-2" 
                        type="button" 
                        id="favoritesDropdown" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        style={{ 
                            border: "1px solid #28a745", 
                            boxShadow: "0 0 10px rgba(40, 167, 69, 0.4)", 
                            color: "#28a745",
                            fontWeight: "bold"
                        }}
                    >
                        Favorites 
                        <span className="badge bg-secondary text-light">
                            {store.favorites.length}
                        </span>
                    </button>
                    
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="favoritesDropdown">
                        {store.favorites.length === 0 ? (
                            <li className="dropdown-item text-center text-muted">(Empty)</li>
                        ) : (
                            store.favorites.map((fav, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center gap-3">
                                    <Link to={`/single/${fav.type}/${fav.uid}`} className="text-white text-decoration-none">
                                        {fav.name}
                                    </Link>
                                    
                                    {/* Eliminar */}
                                    <i 
                                        className="fas fa-trash text-danger" 
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que el menú se cierre al borrar
                                            removeFavorite(dispatch, fav.name);
                                        }}
                                    ></i>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};