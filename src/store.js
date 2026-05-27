export const initialStore = () => ({
    characters: [],
    planets: [],
    vehicles: [],
    favorites: [] 
});

export default function storeReducer(store, action = {}) {
    switch(action.type) {
        case 'SET_CHARACTERS':
            return { ...store, characters: action.payload };
        case 'SET_PLANETS':
            return { ...store, planets: action.payload };
        case 'SET_VEHICLES':
            return { ...store, vehicles: action.payload };
            
        case 'ADD_FAVORITE':
            if (store.favorites.find(fav => fav.name === action.payload.name)) {
                return store;
            }
            return { ...store, favorites: [...store.favorites, action.payload] };
            
        case 'REMOVE_FAVORITE':
            return { ...store, favorites: store.favorites.filter(fav => fav.name !== action.payload) };
            
        default:
            return store;
    }
}

export const loadData = async (dispatch, category) => {
    try {
        const response = await fetch(`https://www.swapi.tech/api/${category}`);
        if (response.ok) {
            const data = await response.json();
            
            let type = '';
            if (category === 'people') type = 'SET_CHARACTERS';
            if (category === 'planets') type = 'SET_PLANETS';
            if (category === 'vehicles') type = 'SET_VEHICLES';

            dispatch({ type: type, payload: data.results });
        }
    } catch (error) {
        console.error(`Error cargando ${category}:`, error);
    }
};

export const addFavorite = (dispatch, item) => {
    dispatch({ type: 'ADD_FAVORITE', payload: item });
};

export const removeFavorite = (dispatch, name) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: name });
};