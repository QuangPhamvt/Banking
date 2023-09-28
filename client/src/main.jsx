import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { Provider } from "react-redux"
import store from "./store/index.jsx"
import { CookiesProvider } from "react-cookie"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@material-tailwind/react"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<CookiesProvider>
				<BrowserRouter>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</BrowserRouter>
			</CookiesProvider>
		</Provider>
	</React.StrictMode>
)
