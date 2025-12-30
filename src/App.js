import React, { useState, useEffect } from 'react';

const GroupHangout = () => {
  // State
  const [movieSuggestions, setMovieSuggestions] = useState([
    { id: 1, title: "Everything Everywhere All At Once", year: 2022, platform: "Prime", votes: 3 },
    { id: 2, title: "Parasite", year: 2019, platform: "Hulu", votes: 2 },
    { id: 3, title: "Dune: Part Two", year: 2024, platform: "Max", votes: 4 }
  ]);
  const [newSuggestion, setNewSuggestion] = useState({ title: '', year: '', platform: '' });
  const [watchParty, setWatchParty] = useState(null);
  const [notes, setNotes] = useState('');
  const [links, setLinks] = useState([
    { title: "Our Spotify Playlist", url: "https://open.spotify.com/playlist/..." },
    { title: "Mario Kart Tournament Bracket", url: "https://challonge.com/..." }
  ]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  // Load from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('hangout-notes');
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('hangout-notes', notes);
  }, [notes]);

  // Handlers
  const addMovieSuggestion = () => {
    if (newSuggestion.title.trim()) {
      setMovieSuggestions(prev => [...prev, {
        id: Date.now(),
        ...newSuggestion,
        year: Number(newSuggestion.year) || new Date().getFullYear(),
        votes: 1
      }]);
      setNewSuggestion({ title: '', year: '', platform: '' });
    }
  };

  const vote = (id) => {
    setMovieSuggestions(prev =>
      prev.map(m => m.id === id ? { ...m, votes: m.votes + 1 } : m)
    );
  };

  const setWatchTime = (datetime) => {
    setWatchParty(datetime);
  };

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setLinks(prev => [...prev, { ...newLink, id: Date.now() }]);
      setNewLink({ title: '', url: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          🎬 <span className="text-indigo-600 dark:text-indigo-400">The Hangout</span>
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Where we watch, play, and vibe — no context needed.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🎥 Movie Night */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
            🎥 Movie Night
          </h2>
          <div className="space-y-3 mb-5">
            {movieSuggestions
              .sort((a, b) => b.votes - a.votes)
              .map(movie => (
                <div
                  key={movie.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {movie.title} <span className="text-sm text-gray-500 dark:text-gray-400">({movie.year})</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{movie.platform}</div>
                  </div>
                  <button
                    onClick={() => vote(movie.id)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    👍 {movie.votes}
                  </button>
                </div>
              ))}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={newSuggestion.title}
              onChange={e => setNewSuggestion({...newSuggestion, title: e.target.value})}
              placeholder="Movie title"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={newSuggestion.year}
                onChange={e => setNewSuggestion({...newSuggestion, year: e.target.value})}
                placeholder="Year"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                value={newSuggestion.platform}
                onChange={e => setNewSuggestion({...newSuggestion, platform: e.target.value})}
                placeholder="Where? (Netflix, etc.)"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={addMovieSuggestion}
              className="w-full mt-2 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              ➕ Suggest
            </button>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">📅 When?</h3>
            <input
              type="datetime-local"
              onChange={e => setWatchTime(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
            {watchParty && (
              <div className="mt-2 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-center font-medium">
                🎯 Set for: {new Date(watchParty).toLocaleString()}
              </div>
            )}
          </div>
        </section>

        {/* 📝 Shared Space */}
        <section className="space-y-8">
          {/* Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📝 Shared Notes</h2>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Random thoughts, plans, inside jokes..."
              rows="6"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              ✅ Saves automatically in your browser
            </p>
          </div>

          {/* Links */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🔗 Shared Links</h2>
            <ul className="space-y-2 mb-4">
              {links.map(link => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    {link.title} →
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <input
                type="text"
                value={newLink.title}
                onChange={e => setNewLink({...newLink, title: e.target.value})}
                placeholder="Link name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="url"
                value={newLink.url}
                onChange={e => setNewLink({...newLink, url: e.target.value})}
                placeholder="https://..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={addLink}
                className="w-full py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 font-medium rounded-lg hover:bg-gray-900 dark:hover:bg-gray-300 transition"
              >
                ➕ Add Link
              </button>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        Made for friends who’d rather watch, play, and talk than explain themselves.
      </footer>
    </div>
  );
};

export default GroupHangout;
