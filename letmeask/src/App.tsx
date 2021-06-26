import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import './styles/global.scss';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {

    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/rooms/new" component={NewRoom}/> 
                    <Route path="/rooms/:id" component={Room}/> 
                </Switch>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
