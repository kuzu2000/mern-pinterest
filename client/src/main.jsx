import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,  persistor} from './features/store'
import {fetchUser} from './features/userSlice'
import {fetchUserPins} from './features/pinSlice'
import {fetchCreatedPosts} from './features/favouriteSlice'

// const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const auth = currentUser?.result._id;

//   if(auth){
//     store.dispatch(fetchUser(auth))
//   }

  store.dispatch(fetchCreatedPosts())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
)
