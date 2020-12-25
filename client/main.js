import React, { Component } from 'react';
import App from "./App.js";
import { store, persistor } from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loading from "./loading.js";
import { GoogleSignin } from '@react-native-community/google-signin';


GoogleSignin.configure({ iosClientId: '138381920901-s6b1i05fg1st7ob82jd2qkuks4fdkdft.apps.googleusercontent.com' });

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