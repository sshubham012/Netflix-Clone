import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        user: require('./slices/user').default
    },
});