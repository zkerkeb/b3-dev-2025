import Counter from "../../components/Counter";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import zik from "../../assets/zik.mp3";
import { useTranslation } from "react-i18next";


const HomePage = () => {
    const { t,i18n } = useTranslation();
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const goToLogin = () => {
        navigate("/login");
    }

    // Mettre à jour le temps actuel
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const handleSeek = (e) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = e.target.value;
            setCurrentTime(e.target.value);
        }
    };

    const handleVolumeChange = (e) => {
        const audio = audioRef.current;
        const newVolume = e.target.value;
        if (audio) {
            audio.volume = newVolume;
            setVolume(newVolume);
        }
    };

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return <div style={{ padding: '20px', maxWidth: '500px' }}>
        <button onClick={goToLogin}>Login</button>
        <Link to="/login">Login</Link>
        <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
        <p>{t("Welcome to React")}</p>
        {/* <Counter /> */}
        
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Lecteur Audio</h3>
            <audio ref={audioRef} src={zik} />
            
            {/* Contrôles de lecture */}
            <div style={{ marginBottom: '15px' }}>
                <button onClick={togglePlayPause} style={{ marginRight: '10px', padding: '8px 16px' }}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={() => audioRef.current && audioRef.current.load()} style={{ padding: '8px 16px' }}>
                    Stop
                </button>
            </div>

            {/* Slider de position */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Position de lecture</label>
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    style={{ width: '100%', marginBottom: '5px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Slider de volume */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Volume: {Math.round(volume * 100)}%</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{ width: '100%' }}
                />
            </div>
        </div>
    </div>;
  };

export default HomePage;