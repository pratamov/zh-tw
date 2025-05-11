// components/AudioPlayer.js
import React, { useRef, useState } from 'react';

const AudioPlayer = ({ src, onEnded }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.src = src;
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.error("Audio play failed:", e));
        }
    };

    const replay = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.error("Audio replay failed:", e));
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        onEnded?.();
    };

    return {
        play,
        replay,
        isPlaying,
        audioElement: <audio ref={audioRef} onEnded={handleAudioEnded} />
    };
};

export default AudioPlayer;