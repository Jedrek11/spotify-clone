import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [volume, setVolume] = useState(50); 
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    }); {/* czas utworu */}

    const formatTime = (time) => {
        const minutes = time.minute < 10 ? `0${time.minute}` : time.minute;
        const seconds = time.second < 10 ? `0${time.second}` : time.second;
        return `${minutes}:${seconds}`;
    }; {/* czas 00:00 */}

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true)
    }; {/* Start */} 

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
    }; {/* Stop */} 

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        audioRef.current.volume = newVolume / 100;
    };  {/* Zmiana Audio */} 

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }; {/* Jaki utwór gra player */}

    const previous = async () => {
        if (track.id>0) {
            await setTrack(songsData[track.id-1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }; {/* Poprzedni utwór */} 

    const next = async () => {
        if (track.id < songsData.length-1) {
            await setTrack(songsData[track.id+1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }; {/* Następny utwór */}

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    useEffect(()=> {
        setTimeout(()=> {

                audioRef.current.ontimeupdate = () => {
                    seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
                    setTime({ currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }

        }, 1000);
    },[audioRef]); {/* Pasek postępu utworu */}

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous,next,
        seekSong,
        volume,
        setVolume,
        handleVolumeChange,
        formatTime,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )

};

export default PlayerContextProvider;