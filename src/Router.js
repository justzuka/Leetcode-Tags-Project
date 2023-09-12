import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import "./index.css";
import LandingPage from "./LandingPage";
import App from "./App";
function Router() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <LandingPage />,
			errorElement: <Navigate to="/" />,
		},
		{
			path: "/Quiz/:difficulty",
			element: <App />,
		},
	]);

	return (
		<div className="background">
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default Router;
