import AppRoutes from './components/AppRoutes';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from './components/Fallback';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => {
        //reset the state of your app here
      }}
      resetKeys={["someKey"]}
    >
      <div className="App">
        <AppRoutes/>
      </div>
    </ErrorBoundary>
  );
}

export default App;
