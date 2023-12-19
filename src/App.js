import './styles/App.css';
import { useGlobalContext } from './context';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';

function App() {
    const { showModal } = useGlobalContext();
    return (
        <div>
            <Search />
            <Favorites />
            <Meals />
            {showModal && <Modal />}
        </div>
    );
}

export default App;
