import React, { useEffect, useState } from "react";
import "./Problem.css";
import "./index.css";

const link_func = (title_slug) => {
	return "https://leetcode.com/problems/" + title_slug + "/";
};

function Problem({ content, title, difficulty, title_slug }) {
	const [cssDifficulty, setCssDifficulty] = useState([]);

	useEffect(() => {
		setCssDifficulty(("problem-" + difficulty).toLowerCase());
	}, [content]);

	const handleLinkClick = () => {
		// Open the other site in a new window
		window.open(link_func(title_slug), "_blank");
	};

	return (
		<div className="problem-container-holder">
			<div className="problem-container">
				<div className="problem-title">{title}</div>
				<div className="problem-difficulty-link-holder">
					<div className={`problem-difficulty ${cssDifficulty}`}>
						{difficulty}
					</div>
					<button className="problem-link" onClick={handleLinkClick}>
						Problem Link
					</button>
				</div>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</div>
		</div>
	);
}

export default Problem;
