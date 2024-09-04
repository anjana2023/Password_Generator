
import ErrorBoundary from './components/Error/errorBoundaries'
import { DarkModeProvider } from './Context/darkmodeContext'
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

import MainRouter from "./Routes/Router";

const App = () => {
  return (
    <div>
      <ErrorBoundary>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
        <DarkModeProvider>
      <MainRouter/>
    <Toaster/>
      </DarkModeProvider>
      </PersistGate>
        </Provider>
      </ErrorBoundary>
    </div>
  )
}

export default App