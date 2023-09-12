import React, { useEffect, useState } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Link,
} from "react-router-dom";
import "./LandingPage.css";
import "./index.css";
import DifficultyButton from "./DifficultyButton";

function LandingPage({}) {
	return (
		<div className="LandingPage-container">
			<div className="typewriter">
				<h1 className="text">Welcome..</h1>
			</div>
			<div className="LandingPage-buttons">
				<DifficultyButton difficulty={"easy"}></DifficultyButton>
				<DifficultyButton difficulty={"medium"}></DifficultyButton>
				<DifficultyButton difficulty={"hard"}></DifficultyButton>
				<DifficultyButton difficulty={"random"}></DifficultyButton>
			</div>
		</div>
	);
}

export default LandingPage;
