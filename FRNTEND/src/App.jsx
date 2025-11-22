import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [url, setUrl] = useState('');
  const [newLink, setNewLink] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(`${import.meta.env.BCKND_URL}/`, { url }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setNewLink(result.data.newLink);
      setUrl('');
    } catch (error) {
      console.error('Error posting data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-black">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full border border-white/30">
        <h1 className="text-3xl font-bold text-center text-white drop-shadow animate-slideDown mb-6">URL Shortener</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4 animate-fadeInSlow">
          <input
            className="px-4 py-3 rounded-xl bg-white/10 focus:bg-white/20 text-white transition-all duration-300 w-full outline-none shadow-md"
            name="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to shorten..."
            required
          />

          <button
            className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 font-semibold shadow-lg transition"
            type="submit"
          >
            {loading ? 'Processing...' : 'Shorten URL'}
          </button>
        </form>

        {newLink && (
          <div className="mt-6 p-4 bg-white/80 rounded-xl shadow-inner text-center">
            <p className="font-semibold mb-1">Shortened Link:</p>
            <a
              href={newLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 font-medium underline break-all"
            >
              {newLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
