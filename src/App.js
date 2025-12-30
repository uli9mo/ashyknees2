const HangoutTab = ({ darkMode, playSound }) => {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieUrl, setMovieUrl] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [votes, setVotes] = useState({});
  const [notes, setNotes] = useState(`# CDMCS Lore Vault 📜\n- Ibik’s Bogged Survival Log (Dec 14) 📝\n- Trial Chamber Coordinates 🌐\n- \"NIGGER LATER\" — ibikl, line #273 ✨\n\n*Edit freely. This saves to localStorage.*`);
  const [images, setImages] = useState([
    'https://placehold.co/400x250/4ade80/000000?text=Build+of+the+Week',
    'https://placehold.co/400x250/8b5cf6/ffffff?text=Ibik+vs+Bogged+4.0',
    'https://placehold.co/400x250/f59e0b/000000?text=Christmas+Park+Teaser'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cdmcs-hangout-notes');
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('cdmcs-hangout-notes', notes);
  }, [notes]);

  const handleVote = (option) => {
    playSound('ding');
    setVotes(prev => ({ ...prev, [option]: (prev[option] || 0) + 1 }));
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      playSound('click');
      setImages(prev => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const movieOptions = [
    { title: 'The Matrix (1999)', emoji: '🕶️' },
    { title: 'Inception (2010)', emoji: '🌀' },
    { title: 'Spirited Away (2001)', emoji: '🐉' },
    { title: 'Mad Max: Fury Road (2015)', emoji: '🚗' },
    { title: 'Your Suggestion...', emoji: '✏️' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          🗨️ CDMCS <span className={darkMode ? 'text-purple-300' : 'text-purple-600'}>Hangout</span>
        </h1>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Where the squad reconnects — no drama, just blocks, Bogged, and vibes ✨
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Movie Night */}
        <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800/60 border border-purple-700/50' : 'bg-purple-50 border border-purple-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
            🎬 Movie Night Planner
          </h2>
          <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Vote → Pick time → Chill together. Stream however you want (Discord screenshare, etc.).
          </p>

          <div className="space-y-3 mb-5">
            {movieOptions.map((opt, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl flex justify-between items-center cursor-pointer transition ${
                  darkMode ? 'bg-gray-900/40 hover:bg-gray-800' : 'bg-white hover:bg-gray-100'
                }`}
                onClick={() => handleVote(opt.title)}
              >
                <span>{opt.emoji} {opt.title}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  (votes[opt.title] || 0) > 0
                    ? (darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white')
                    : (darkMode ? 'bg-gray-700' : 'bg-gray-300')
                }`}>
                  {votes[opt.title] || 0} 👍
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              type="text"
              value={movieTitle}
              onChange={e => setMovieTitle(e.target.value)}
              placeholder="Custom movie title"
              className={`p-2.5 rounded-lg ${themeClasses.input}`}
            />
            <input
              type="url"
              value={movieUrl}
              onChange={e => setMovieUrl(e.target.value)}
              placeholder="Trailer or stream link"
              className={`p-2.5 rounded-lg ${themeClasses.input}`}
            />
          </div>
          <input
            type="datetime-local"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className={`w-full p-2.5 rounded-lg ${themeClasses.input} mb-4`}
          />
          {selectedDate && (
            <div className={`p-3 rounded-lg text-center font-bold ${
              darkMode ? 'bg-green-900/40 text-green-300' : 'bg-green-100 text-green-700'
            }`}>
              🎯 Scheduled: {new Date(selectedDate).toLocaleString()}
            </div>
          )}
        </div>

        {/* Shared Gallery */}
        <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800/60 border border-pink-700/50' : 'bg-pink-50 border border-pink-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'text-pink-300' : 'text-pink-700'}`}>
            📸 Shared Gallery
          </h2>
          <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Drag in screenshots, builds, Bogged fails — no upload, just paste or link.
          </p>

          <div className="flex gap-2 mb-3">
            <input
              type="url"
              value={newImageUrl}
              onChange={e => setNewImageUrl(e.target.value)}
              placeholder="Paste image URL (e.g., Discord link)"
              className={`flex-1 p-2.5 rounded-lg ${themeClasses.input}`}
              onKeyPress={e => e.key === 'Enter' && addImage()}
            />
            <button
              onClick={addImage}
              className={`px-4 py-2.5 rounded-lg font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white`}
            >
              ➕ Add
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((url, i) => (
              <div key={i} className="aspect-video rounded-xl overflow-hidden border border-gray-700/50">
                <img
                  src={url}
                  alt={`Shared ${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={(e) => e.target.src = STEVE_ICON}
                  onClick={() => window.open(url, '_blank')}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Shared Notes */}
        <div className="lg:col-span-2">
          <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800/60 border border-blue-700/50' : 'bg-blue-50 border border-blue-200'}`}>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              📝 Shared Notes & Lore
            </h2>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows="8"
              className={`w-full p-4 rounded-xl font-mono text-sm ${
                darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
              }`}
            />
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              ⚠️ This saves in *your browser only* (localStorage). To share, copy-paste into Discord — or later, we can sync via Supabase!
            </p>
          </div>
        </div>
      </div>

      {/* Easter Egg Button — Hidden in Hangout */}
      <div className="text-center mt-10">
        <button
          onClick={() => {
            playSound('secret');
            alert("🤫 Psst — the Dragon Egg teleports when you click it. Try finding it in Hangout mode...");
          }}
          className={`px-5 py-2.5 rounded-full font-bold text-sm ${
            darkMode 
              ? 'bg-amber-800 text-amber-200 hover:bg-amber-700' 
              : 'bg-amber-500 text-white hover:bg-amber-600'
          }`}
        >
          🔍 Find the Hidden Egg...
        </button>
      </div>
    </div>
  );
};
