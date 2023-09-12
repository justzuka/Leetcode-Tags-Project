import React, { useEffect, useState } from "react";
import "./index.css";
import "./Quiz.css";

const tag_add_amount = 3;
const one_tag_text_func = () => {
	return "Please select a single tag that you believe is the most suitable for this problem";
};
const many_tag_text_func = (tagNumber) => {
	return `Please select ${tagNumber} tags that you believe are the most suitable for this problem`;
};

function Quiz({ topic_tags, all_topic_tags, nextProblem }) {
	const [topicTags, setTopicTags] = useState([]);
	const [checkIsClicked, setCheckIsClicked] = useState(false);
	const [tagIsSelected, setTagIsSelected] = useState([]);
	const [tagIsClicked, setTagIsClicked] = useState([]);
	const [correctTagNumber, setCorrectTagNumber] = useState(0);
	const [checking, setChecking] = useState(false);
	const [showNotSelectedCorrect, setShowNotSelectedCorrect] = useState(false);
	const [selectedIndexList, setSelectedIndexList] = useState([]);
	const [correctlySelected, setCorrectlySelected] = useState(0);

	const shuffleArray = (input) => {
		let arr = [...input];

		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr;
	};

	const generateRandomNumber = (min, max) => {
		const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNum;
	};

	const handleCheckClick = () => {
		setCheckIsClicked(true);
		setChecking(true);

		setTimeout(() => {
			setCheckIsClicked(false);
		}, 100);
	};

	const handleTryAgain = () => {
		setChecking(false);
		setShowNotSelectedCorrect(false);

		let arr = [...tagIsSelected];
		let hashset = new Set();
		for (let i = 0; i < arr.length; i++) {
			if (!topicTags[i][1]) {
				arr[i] = false;
				hashset.add(i);
			}
		}
		let newSelectedIndices = [];

		for (let i = 0; i < selectedIndexList.length; i++) {
			if (!hashset.has(selectedIndexList[i])) {
				newSelectedIndices.push(selectedIndexList[i]);
			}
		}
		setSelectedIndexList(newSelectedIndices);
		setTagIsSelected(arr);
	};

	const tagClick = (index) => {
		let clickedArr = [...tagIsClicked];
		clickedArr[index] = true;
		setTagIsClicked(clickedArr);

		setTimeout(() => {
			let clickedArr = [...tagIsClicked];
			clickedArr[index] = false;
			setTagIsClicked(clickedArr);
		}, 100);

		let arr = [...tagIsSelected];
		let selectedIndices = selectedIndexList;
		if (arr[index] === false) {
			selectedIndices.push(index);

			if (selectedIndices.length > correctTagNumber) {
				arr[selectedIndices[0]] = false;
				selectedIndices = selectedIndices.slice(1);
			}
			setSelectedIndexList(selectedIndices);
		} else {
			setSelectedIndexList(
				selectedIndices.filter((element) => element !== index)
			);
		}

		arr[index] = !arr[index];
		setTagIsSelected(arr);

		let corSel = 0;

		for (let i = 0; i < selectedIndices.length; i++) {
			if (topicTags[selectedIndices[i]][1]) {
				corSel += 1;
			}
		}

		setCorrectlySelected(corSel);
		console.log(corSel + ":" + correctTagNumber);
	};

	const handleShowMissedClick = () => {
		setShowNotSelectedCorrect(true);
	};

	const handleNext = () => {
		nextProblem();
		setChecking(false);
		setShowNotSelectedCorrect(false);
		setSelectedIndexList([]);
	};

	useEffect(() => {
		let arr = [];
		let tagIsSelectedArr = [];
		let collectedTags = new Set([]);

		for (let i = 0; i < topic_tags.length; i++) {
			// tag , isCorrect , isClicked
			arr.push([topic_tags[i], true]);
			tagIsSelectedArr.push(false);
			collectedTags.add(topic_tags[i]);
		}

		const tagAmount = 2 * topic_tags.length + tag_add_amount;

		while (arr.length < tagAmount) {
			const rand = generateRandomNumber(0, all_topic_tags.length - 1);

			if (!collectedTags.has(all_topic_tags[rand])) {
				collectedTags.add(all_topic_tags[rand]);
				arr.push([all_topic_tags[rand], false]);
				tagIsSelectedArr.push(false);
			}
		}

		setTopicTags(shuffleArray(arr));
		setTagIsSelected(tagIsSelectedArr);
		setTagIsClicked(tagIsSelectedArr);
		setCorrectTagNumber(topic_tags.length);
	}, [topic_tags, all_topic_tags, nextProblem]);

	return (
		<div className="quiz-buttons-container">
			<div className="quiz-container">
				<div className="quiz-head">
					{correctTagNumber === 1
						? one_tag_text_func()
						: many_tag_text_func(correctTagNumber)}
				</div>

				<div className="quiz-tags">
					{topicTags.map((tag, index) => {
						return (
							<button
								className={`quiz-tag ${
									checking
										? topicTags[index][1]
											? "quiz-tag-correct"
											: "quiz-tag-wrong"
										: ""
								}  ${tagIsSelected[index] ? "selected" : ""} ${
									tagIsClicked[index] ? "clicked" : ""
								}
								${
									showNotSelectedCorrect &&
									topicTags[index][1] &&
									!tagIsSelected[index]
										? "show-correct"
										: ""
								}
								`}
								key={tag}
								onClick={
									checking
										? () => {}
										: () => {
												tagClick(index);
										  }
								}
							>
								{tag[0]}
							</button>
						);
					})}
				</div>
			</div>
			<div className="buttons">
				{correctlySelected !== correctTagNumber ? (
					<div
						className={`quiz-show-missed ${
							showNotSelectedCorrect ? "clicked" : ""
						}`}
						onClick={showNotSelectedCorrect ? () => {} : handleShowMissedClick}
					>
						{!checking ? "" : "Show Missed Answers"}
					</div>
				) : (
					""
				)}
				<button
					className={`quiz-check-button ${checking ? "try-again" : ""} ${
						checkIsClicked ? "clicked" : ""
					}`}
					onClick={
						checking
							? correctlySelected !== correctTagNumber &&
							  !showNotSelectedCorrect
								? handleTryAgain
								: handleNext
							: handleCheckClick
					}
				>
					{!checking
						? "Check"
						: correctlySelected !== correctTagNumber && !showNotSelectedCorrect
						? "Try Again"
						: "Next"}
				</button>
			</div>
		</div>
	);
}

export default Quiz;
