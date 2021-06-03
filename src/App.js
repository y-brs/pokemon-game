import {useLocation, Route, Switch, Redirect} from 'react-router-dom';
import Firebase from './service/firebase';
import {FireBaseContext} from './context/firebaseContext';

import cn from 'classnames';

import HomePage from './routes/Home';
import GamePage from './routes/Game';
import AboutPage from './routes/About';
import ContactPage from './routes/Contact';

import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';

import s from './style.module.css';

const App = () => {
	const location = useLocation();
	const isPadding = location.pathname === '/' || location.pathname === '/game/board';

	return (
		<FireBaseContext.Provider value={new Firebase()}>
			<Switch>
				<Route path="/404" render={() => (
					<h1>404. Page not found 😔</h1>
				)} />
				<Route>
					<>
						<MenuHeader bgActive={!isPadding} />
						<div className={cn(s.wrap, {
							[s.isHomePage]: isPadding
						})}>
							<Switch>
								<Route path="/" component={HomePage} exact />
								<Route path="/home" component={HomePage} />
								<Route path="/game" component={GamePage} />
								<Route path="/about" component={AboutPage} />
								<Route path="/contact" component={ContactPage} />
								<Route render={() => (
									<Redirect to="/404" />
								)} />
							</Switch>
						</div>
						<Footer />
					</>
				</Route>
			</Switch>
		</FireBaseContext.Provider>
	);
};

export default App;