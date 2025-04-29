import React, { useState, useEffect } from 'react';
import "./index.css";

function GifSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [gifs, setGifs] = useState([]);
    const [triggerSearch, setTriggerSearch] = useState(false);

    useEffect(() => {
        const fetchDefaultGifs = async () => {
            try {
                const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
                const response = await fetch(`${import.meta.env.VITE_GIPHY_API_URL}search?q=realmadrid&api_key=${API_KEY}&limit=10`);
                const data = await response.json();
                setGifs(data.data);
            } catch (error) {
                console.log('Xəta baş verdi !!!!:', error);
            }
        };

        fetchDefaultGifs();
    }, []);

    useEffect(() => {
        if (triggerSearch && searchTerm) {
            const fetchGifs = async () => {
                try {
                    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
                    const response = await fetch(`${import.meta.env.VITE_GIPHY_API_URL}search?q=${searchTerm}&api_key=${API_KEY}&limit=10`);
                    const data = await response.json();
                    setGifs(data.data);
                } catch (error) {
                    console.log('Xəta baş verdi !!!!:', error);
                }
            };
            fetchGifs();
            setTriggerSearch(false);
        }
    }, [triggerSearch, searchTerm]);

    const handleDownload = (gifUrl, title) => {
        fetch(gifUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = title;
                link.click();
            })
            .catch((error) => console.log('Download error:', error));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") { 
            setTriggerSearch(true); 
        }
    };

    return (
        <>
            <h1>Gif Axtarış</h1>

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}  
                placeholder='Gif axtar'
            />

            <button
                onClick={() => setTriggerSearch(true)}  
            >
                Axtar
            </button>

            <div className='gifDiv'>
                {gifs.map((gif) => (
                    <div key={gif.id} className='gifsDiv'>
                        <img
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                            style={{ width: '200px', margin: '20px' }}
                        />

                        <button onClick={() => handleDownload(gif.images.fixed_height.url, gif.title)}>
                            Yüklə
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default GifSearch;
