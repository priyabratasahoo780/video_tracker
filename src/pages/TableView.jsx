import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FaCheck, FaTimes, FaSearch, FaYoutube } from 'react-icons/fa';

const TableView = () => {
  const { questions, updateQuestion } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.name.toLowerCase().includes(search.toLowerCase()) || 
                          q.number.toString().includes(search);
    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'text-green-400 bg-green-500/10 border-green-500/25';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25';
      case 'Hard': return 'text-red-400 bg-red-500/10 border-red-500/25';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-darker text-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Database <span className="text-neonBlue">Table View</span>
          </h2>
          <p className="text-gray-400 mt-1">Structured repository overview with workflow and execution logs.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <FaSearch />
            </span>
            <input 
              type="text" 
              placeholder="Search by number or name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-dark border border-gray-800 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-neonBlue transition-colors text-sm"
            />
          </div>

          {/* Difficulty Dropdown */}
          <select 
            value={difficultyFilter} 
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-dark border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-neonBlue transition-colors text-sm cursor-pointer"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="glassmorphism w-full overflow-hidden border border-gray-800 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-darker/60 border-b border-gray-800 text-gray-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-4 px-6 w-16">No.</th>
                <th className="py-4 px-6 w-24 text-center">LeetCode #</th>
                <th className="py-4 px-6">Question Name</th>
                <th className="py-4 px-6 text-center">Long Video</th>
                <th className="py-4 px-6 text-center">Short Video</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-sm">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-500 font-medium">
                    No questions match the search filters.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q, index) => (
                  <tr key={q.id} className="hover:bg-white/5 transition-colors">
                    {/* Index */}
                    <td className="py-4 px-6 text-gray-500 font-mono">{index + 1}</td>

                    {/* Question Number */}
                    <td className="py-4 px-6 text-center font-mono font-bold text-gray-300">
                      {q.number}
                    </td>

                    {/* Name & Metadata */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-white">{q.name}</span>
                          {q.link && (
                            <a 
                              href={q.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-xs text-neonBlue hover:underline flex items-center gap-1 font-semibold"
                            >
                              Solve ↗
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getDifficultyColor(q.difficulty)}`}>
                            {q.difficulty}
                          </span>
                          <span className="text-[10px] text-gray-500 font-semibold">
                            {q.topic}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Long Video Status Toggles */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => updateQuestion(q.id, { longVideoEdited: !q.longVideoEdited })}
                          className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${q.longVideoEdited ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-700/50 text-gray-400 border border-transparent'}`}
                        >
                          {q.longVideoEdited ? 'EDITED' : 'EDIT'}
                        </button>
                        <button 
                          onClick={() => updateQuestion(q.id, { longVideoUploaded: !q.longVideoUploaded })}
                          className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${q.longVideoUploaded ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-gray-700/50 text-gray-400 border border-transparent'}`}
                        >
                          {q.longVideoUploaded ? 'UPLOADED' : 'UPLOAD'}
                        </button>
                      </div>
                    </td>

                    {/* Short Video Status Toggles */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => updateQuestion(q.id, { shortVideoEdited: !q.shortVideoEdited })}
                          className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${q.shortVideoEdited ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-700/50 text-gray-400 border border-transparent'}`}
                        >
                          {q.shortVideoEdited ? 'EDITED' : 'EDIT'}
                        </button>
                        <button 
                          onClick={() => updateQuestion(q.id, { shortVideoUploaded: !q.shortVideoUploaded })}
                          className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${q.shortVideoUploaded ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'bg-gray-700/50 text-gray-400 border border-transparent'}`}
                        >
                          {q.shortVideoUploaded ? 'UPLOADED' : 'UPLOAD'}
                        </button>
                      </div>
                    </td>

                    {/* Finish vs Pending */}
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => updateQuestion(q.id, { completed: !q.completed })}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${q.completed ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.15)]' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'}`}
                        >
                          {q.completed ? (
                            <>
                              <FaCheck className="text-[10px]" /> FINISH
                            </>
                          ) : (
                            <>
                              <FaTimes className="text-[10px]" /> PENDING
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableView;
