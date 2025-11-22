"use client";

import { useState } from "react";

interface MistakeEntry {
  title: string;
  details: string;
}

export default function MistakeLog() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [entries, setEntries] = useState<MistakeEntry[]>([]);
  const [error, setError] = useState("");

  const addEntry = () => {
    if (!title.trim() || !details.trim()) {
      setError("Please fill in both fields before adding an entry.");
      return;
    }
    setEntries([...entries, { title: title.trim(), details: details.trim() }]);
    setTitle("");
    setDetails("");
    setError("");
  };

  const deleteEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setEntries([]);
  };

  return (
    <section className="w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Add a Mistake</h2>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="mistake-title" className="font-medium">
          Mistake Title
        </label>
        <input
          id="mistake-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="mistake-details" className="font-medium">
          Details
        </label>
        <textarea
          id="mistake-details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
          className="border rounded px-2 py-1"
        />
      </div>
      {error && (
        <p className="text-red-600 mb-2">{error}</p>
      )}
      <button
        onClick={addEntry}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Entry
      </button>

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Mistake Log</h2>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry, index) => (
            <li key={index} className="border rounded p-4">
              <strong>{entry.title}</strong>
              <p className="mt-2 whitespace-pre-wrap">{entry.details}</p>
              <button
                onClick={() => deleteEntry(index)}
                className="mt-2 text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {entries.length > 0 && (
        <button
          onClick={clearAll}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Clear All
        </button>
      )}
    </section>
  );
}
