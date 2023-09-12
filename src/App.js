import "./App.css";
import "./Problem.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import problems_file_easy from "./data/problems_easy.txt";
import problems_file_medium from "./data/problems_medium.txt";
import problems_file_hard from "./data/problems_hard.txt";
import problems_file_random from "./data/problems_random.txt";
import Problem from "./Problem";
import Quiz from "./Quiz";

const all_topic_tags = [
	"Two Pointers",
	"Greedy",
	"Binary Indexed Tree",
	"String Matching",
	"Backtracking",
	"Recursion",
	"Doubly-Linked List",
	"Hash Table",
	"Enumeration",
	"Sorting",
	"Shortest Path",
	"Binary Tree",
	"Math",
	"Data Stream",
	"Simulation",
	"Trie",
	"Monotonic Queue",
	"Suffix Array",
	"Breadth-First Search",
	"Design",
	"Merge Sort",
	"Number Theory",
	"Radix Sort",
	"Memoization",
	"Brainteaser",
	"Segment Tree",
	"Strongly Connected Component",
	"Matrix",
	"Queue",
	"Dynamic Programming",
	"Bit Manipulation",
	"Union Find",
	"Hash Function",
	"String",
	"Geometry",
	"Graph",
	"Linked List",
	"Monotonic Stack",
	"Depth-First Search",
	"Prefix Sum",
	"Array",
	"Quickselect",
	"Heap (Priority Queue)",
	"Combinatorics",
	"Tree",
	"Counting",
	"Stack",
	"Binary Search",
	"Divide and Conquer",
	"Bitmask",
	"Topological Sort",
	"Ordered Set",
	"Rolling Hash",
	"Sliding Window",
];

function App() {
	const [problemInfo, setProblemInfo] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [problemIndex, setProblemIndex] = useState(0);
	const { difficulty } = useParams();
	const navigate = useNavigate();
	const [seenSet, setSeenSet] = useState(new Set());

	const nextProblem = () => {
		const updatedSet = new Set(seenSet);
		updatedSet.add(problemInfo[problemIndex]["titleSlug"]);

		// Store the updated Set in localStorage

		let current = problemIndex;
		while (true) {
			current += 1;
			if (current >= problemInfo.length) {
				// seen all
				for (let i = 0; i < problemInfo.length; i++) {
					updatedSet.delete(problemInfo[i]["titleSlug"]);
				}

				current = 0;
				break;
			} else {
				if (!updatedSet.has(problemInfo[current]["titleSlug"])) {
					break;
				}
			}
		}

		setSeenSet(updatedSet);
		localStorage.setItem("mySet", JSON.stringify(Array.from(updatedSet)));
		setProblemIndex(current);
	};

	const handleDifficulty = () => {
		switch (difficulty) {
			case "easy":
				return problems_file_easy;

			case "medium":
				return problems_file_medium;

			case "hard":
				return problems_file_hard;

			case "random":
				return problems_file_random;

			default:
				navigate("/");
				break;
		}
	};

	const shuffleArray = (input) => {
		let arr = [...input];

		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr;
	};

	useEffect(() => {
		const storedSet = localStorage.getItem("mySet");
		if (storedSet) {
			setSeenSet(new Set(JSON.parse(storedSet)));
		}

		fetch(handleDifficulty())
			.then((response) => response.json())
			.then((data) => {
				var arr = [];

				data.forEach((element) => {
					const obj = {
						content: element.content,
						title: element.title,
						difficulty: element.difficulty,
						topicTags: element.topic_tags,
						titleSlug: element.title_slug,
					};
					arr.push(obj);
				});

				arr = shuffleArray(arr);
				console.log(arr.length);
				setProblemInfo(arr);
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			{isLoading ? (
				<div>Loading</div>
			) : (
				<div className="problem-quiz-holder">
					<Problem
						content={problemInfo[problemIndex]["content"]}
						title={problemInfo[problemIndex]["title"]}
						difficulty={problemInfo[problemIndex]["difficulty"]}
						title_slug={problemInfo[problemIndex]["titleSlug"]}
					></Problem>
					<Quiz
						topic_tags={problemInfo[problemIndex]["topicTags"]}
						all_topic_tags={all_topic_tags}
						nextProblem={nextProblem}
					></Quiz>
				</div>
			)}
		</>
	);
}

export default App;
