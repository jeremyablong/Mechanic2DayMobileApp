import React, { Component } from 'react';
import App from "./App.js";
import { store, persistor } from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loading from "./loading.js";
import { GoogleSignin } from '@react-native-community/google-signin';


GoogleSignin.configure({ iosClientId: '' });

class MainComponent extends Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={<Loading />} persistor={persistor}>
						<App />
				</PersistGate>
			</Provider>
		);
	}
}
export default MainComponent;
