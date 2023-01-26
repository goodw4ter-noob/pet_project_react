import { Provider } from 'react-redux';
import { store } from '../redux/store';
import './App.css'
import PageRoutes from './components/PageRoutes';

function App() {
	return (
		<Provider store={store}>
			<PageRoutes />
		</Provider>
	)
}

export default App
