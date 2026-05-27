import React, { useEffect } from "react";
import { Card } from "../components/Card.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { loadData } from "../store.js";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (store.characters.length === 0) loadData(dispatch, "people");
        if (store.planets.length === 0) loadData(dispatch, "planets");
        if (store.vehicles.length === 0) loadData(dispatch, "vehicles");
    }, []);

    return (
        <div className="container-fluid min-vh-100 pb-5 pt-3">
            
            {/* Personajes */}
            <div className="container mb-5">
                <h2 className="text-danger mb-4 fw-bold" style={{ textShadow: "0 0 10px rgba(220, 53, 69, 0.8)" }}>
                    <i className="fas fa-jedi me-2"></i>Characters
                </h2>
                <div className="d-flex overflow-auto flex-nowrap pb-3 custom-scrollbar">
                    {store.characters.length === 0 ? (
                        <div className="text-light">Loading characters...</div>
                    ) : (
                        store.characters.map((char) => (
                            <Card key={char.uid} item={char} type="people" />
                        ))
                    )}
                </div>
            </div>

            {/* Planetas */}
            <div className="container mb-5">
                <h2 className="text-primary mb-4 fw-bold" style={{ textShadow: "0 0 10px rgba(0, 123, 255, 0.8)" }}>
                    <i className="fas fa-globe me-2"></i>Planets
                </h2>
                <div className="d-flex overflow-auto flex-nowrap pb-3 custom-scrollbar">
                    {store.planets.length === 0 ? (
                        <div className="text-light">Loading planets...</div>
                    ) : (
                        store.planets.map((planet) => (
                            <Card key={planet.uid} item={planet} type="planets" />
                        ))
                    )}
                </div>
            </div>

            {/* Vehiculos */}
            <div className="container mb-5">
                <h2 className="text-success mb-4 fw-bold" style={{ textShadow: "0 0 10px rgba(40, 167, 69, 0.8)" }}>
                    <i className="fas fa-space-shuttle me-2"></i>Vehicles
                </h2>
                <div className="d-flex overflow-auto flex-nowrap pb-3 custom-scrollbar">
                    {store.vehicles.length === 0 ? (
                        <div className="text-light">Loading vehicles...</div>
                    ) : (
                        store.vehicles.map((vehicle) => (
                            <Card key={vehicle.uid} item={vehicle} type="vehicles" />
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};