import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "./DifficultyButton.css";

function DifficultyButton({ difficulty }) {
	const navigate = useNavigate();
	return (
		<div
			className={`DifficultyButton-container ${"problem-" + difficulty}`}
			onClick={() => {
				navigate(`./Quiz/${difficulty}`);
			}}
		>
			{difficulty}
		</div>
	);
}

export default DifficultyButton;
