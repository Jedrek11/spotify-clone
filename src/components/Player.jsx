import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {

    const {track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong, volume, handleVolumeChange, formatTime} = useContext(PlayerContext);

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
        <div className="hidden lg:flex items-center gap-4">
            <img className="w-12" src={track.image} alt="" />
            <div>
                <p>{track.name}</p>
                <p>{track.desc.slice(0-12)}</p>
            </div>
        </div>
        <div className="flex flex-col items-center gap-1 m-auto">
            <div className="flex gap-4">
                <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="shuffle" /> {/* Na zmiane piosenka */}
                <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="previuse" /> {/* Poprzednia piosenka */}
                {playStatus
                ?<img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="stop" /> 
                :<img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="start" /> 
                } {/* Start i Stop */}                    
                <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="next" /> {/* Następna piosenka */}
                <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="loop" /> {/* Na okrągło piosenka */}
            </div>
            <div className="flex items-center gap-5">
                <p>{formatTime(time.currentTime)}</p>
                <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                    <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full" />
                </div>
                <p>{formatTime(time.totalTime)}</p>
            </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 opacity-75">
            <img className="w-4" src={assets.plays_icon} alt="" /> {/* Player */}
            <img className="w-4" src={assets.mic_icon} alt="" /> {/* Tekst Piosenki */}
            <img className="w-4" src={assets.queue_icon} alt="" /> {/* Kolejka */}
            <img className="w-4" src={assets.speaker_icon} alt="" /> {/* Głośnik -> połącz */}
            <img className="w-4" src={assets.volume_icon} alt="" /> {/* głośność */}
        
            <input className="w-20 bg-slate-50 h-1 rounded"
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
            />
            <img className="w-4" src={assets.mini_player_icon} alt="" /> {/* Okno w oknie */}
            <img className="w-4" src={assets.zoom_icon} alt="" /> {/* Na cały ekran */}
        </div>
    </div>
  )
}

export default Player