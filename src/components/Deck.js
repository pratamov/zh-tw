// components/Deck.js
import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import DeckHeader from './DeckHeader';
import ItemHint from './ItemHint';
import ItemAudio from './ItemAudio';
import Instructions from './Instructions';

function Deck({ deck, onComplete, onBack }) {
	const [items, setItems] = useState([]);
	const [masks, setMasks] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showHint, setShowHint] = useState(false);
	const [startTime, setStartTime] = useState(Date.now());
	const [timings, setTimings] = useState([]);

	const {
		play: playAudio,
		replay: handleReplay,
		isPlaying,
		audioElement
	} = AudioPlayer({
		src: items[currentIndex]?.sound,
		onEnded: () => { }
	});

	// Shuffle items and initialize state
	useEffect(() => {
		const shuffledItems = [...deck.items].sort(() => Math.random() - 0.5);
		setItems(shuffledItems);
		setCurrentIndex(0);
		setShowHint(false);
		setTimings([]);

		// Generate masks array
		const newMasks = shuffledItems.map(item => {
			// Split sentence into words and clean them
			const words = item.item
				.split(' ')
				.map(word => word.trim())
				.filter(word => !['?', ',', '!'].includes(word));

			// Select random word if available
			return words.length > 0
				? words[Math.floor(Math.random() * words.length)]
				: ''; // Fallback for empty sentences
		});
		setMasks(newMasks);
	}, [deck]);

	// Handle keyboard events
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Enter') {
				handleNext();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [showHint, currentIndex, items.length]);

	// Play audio when item changes
	useEffect(() => {
		if (items.length > 0 && currentIndex < items.length) {
			setShowHint(false);
			setStartTime(Date.now());
			playAudio();
		}
	}, [currentIndex, items]);

	const handleNext = () => {
		if (!showHint) {
			setShowHint(true);
			const timeTaken = (Date.now() - startTime) / 1000;
			setTimings(prev => [...prev, {
				item: items[currentIndex],
				timeTaken
			}]);
		} else {
			if (currentIndex < items.length - 1) {
				setCurrentIndex(currentIndex + 1);
			} else {
				onComplete(timings);
			}
		}
	};

	if (items.length === 0) return <div>Loading...</div>;

	console.log(masks);
	return (
		<div className="deck">
			{audioElement}

			<DeckHeader
				deck={deck}
				currentIndex={currentIndex}
				itemsLength={items.length}
				onBack={onBack}
			/>

			<div className="item-container">
				{!showHint ? (
					<ItemAudio
						sentence={items[currentIndex].item}
						word={masks[currentIndex]}
						isPlaying={isPlaying}
						onReplay={handleReplay}
					/>
				) : (
					<ItemHint 
						sentence={items[currentIndex].item} 
						word={masks[currentIndex]} />
				)}

				<Instructions
					showHint={showHint}
					onNext={handleNext}
				/>
			</div>
		</div>
	);
}

export default Deck;