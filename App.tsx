import React from 'react';
import {legacy_createStore as createStore} from 'redux';
import reducers from './src/reducers';
import {Provider} from 'react-redux';
import SearchScreen from './src/screen/SearchScreen';

let store = createStore(reducers);
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SearchScreen />
    </Provider>
  );
};
export default App;
