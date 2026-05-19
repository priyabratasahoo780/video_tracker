import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSearch, FaTrash, FaCheck, FaTimes, FaBook } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import AddQuestionModal from '../components/AddQuestionModal';

const Tracker = () => {
  const { questions, updateQuestion, deleteQuestion, settings, loadDemoData } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [previewVideo, setPreviewVideo] = useState(null);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    try {
      let videoId = '';
      if (url.includes('youtube.com/watch')) {
        videoId = new URL(url).searchParams.get('v');
      } else if (url.includes('youtube.com/shorts/')) {
        videoId = url.split('shorts/')[1].split('?')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
    } catch (e) {
      return url;
    }
  };

  const handleComplete = (id, currentStatus) => {
    if (!currentStatus && settings.confetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ff0055', '#39ff14']
      });
    }
    updateQuestion(id, { completed: !currentStatus });
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchSearch = q.name.toLowerCase().includes(search.toLowerCase()) || q.number.toString().includes(search);
      const matchDifficulty = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
      const matchStatus = filterStatus === 'All' || 
                          (filterStatus === 'Completed' && q.completed) || 
                          (filterStatus === 'Pending' && !q.completed);
      return matchSearch && matchDifficulty && matchStatus;
    }).sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }, [questions, search, filterDifficulty, filterStatus]);

  return (
    <div className="p-6 md:p-10 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-white">Questions <span className="text-neonPink">Tracker</span></h2>
        <div className="flex gap-3">
          {questions.length === 0 && (
            <button 
              onClick={loadDemoData}
              className="flex items-center gap-2 bg-purple-500/20 text-purple-400 border border-purple-500 px-4 py-2 rounded-lg hover:bg-purple-500 hover:text-white transition-all shadow-[0_0_10px_purple]"
            >
              <FaBook /> Load Demo Data
            </button>
          )}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-neonBlue/20 text-neonBlue border border-neonBlue px-4 py-2 rounded-lg hover:bg-neonBlue hover:text-darker transition-all shadow-neon"
          >
            <FaPlus /> Add Question
          </button>
        </div>
      </div>

      <div className="glassmorphism p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or number..." 
            className="w-full bg-darker border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-neonBlue transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="bg-darker border border-gray-700 text-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-neonBlue w-full md:w-auto"
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select 
          className="bg-darker border border-gray-700 text-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-neonBlue w-full md:w-auto"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        <AnimatePresence>
          {filteredQuestions.map(q => (
            <motion.div
              key={q.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`glassmorphism p-5 border-t-4 flex flex-col ${
                q.difficulty === 'Easy' ? 'border-t-green-500' :
                q.difficulty === 'Medium' ? 'border-t-yellow-500' : 'border-t-red-500'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-400 text-xs font-mono">#{q.number}</span>
                <span className="text-xs text-gray-500">{new Date(q.dateAdded).toLocaleDateString()}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 truncate">
                {q.link ? (
                  <a href={q.link} target="_blank" rel="noreferrer" className="hover:text-neonBlue transition-colors">{q.name}</a>
                ) : q.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{q.topic}</p>

              <div className="flex flex-col gap-2 mb-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <button 
                    onClick={() => handleComplete(q.id, q.completed)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${q.completed ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    {q.completed ? <><FaCheck /> Completed</> : <><FaTimes /> Pending</>}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800">
                  <span className="text-gray-400">Long Video</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateQuestion(q.id, { longVideoEdited: !q.longVideoEdited })}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${q.longVideoEdited ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'}`}
                    >
                      {q.longVideoEdited ? 'EDITED' : 'NOT EDITED'}
                    </button>
                    <button 
                      onClick={() => updateQuestion(q.id, { longVideoUploaded: !q.longVideoUploaded })}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${q.longVideoUploaded ? 'bg-pink-500/20 text-pink-400' : 'bg-gray-700 text-gray-300'}`}
                    >
                      {q.longVideoUploaded ? 'UPLOADED' : 'NOT UPLOADED'}
                    </button>
                    {q.longVideoUrl && (
                      <button 
                        onClick={() => setPreviewVideo(q.longVideoUrl)}
                        className="px-2 py-1 rounded text-[10px] font-bold bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors shadow-[0_0_5px_red]"
                      >
                        ▶ WATCH
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-400">Short Video</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateQuestion(q.id, { shortVideoEdited: !q.shortVideoEdited })}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${q.shortVideoEdited ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'}`}
                    >
                      {q.shortVideoEdited ? 'EDITED' : 'NOT EDITED'}
                    </button>
                    <button 
                      onClick={() => updateQuestion(q.id, { shortVideoUploaded: !q.shortVideoUploaded })}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${q.shortVideoUploaded ? 'bg-pink-500/20 text-pink-400' : 'bg-gray-700 text-gray-300'}`}
                    >
                      {q.shortVideoUploaded ? 'UPLOADED' : 'NOT UPLOADED'}
                    </button>
                    {q.shortVideoUrl && (
                      <button 
                        onClick={() => setPreviewVideo(q.shortVideoUrl)}
                        className="px-2 py-1 rounded text-[10px] font-bold bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors shadow-[0_0_5px_red]"
                      >
                        ▶ WATCH
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                    <input 
                      type="checkbox" 
                      className="accent-neonBlue w-4 h-4"
                      checked={q.revision}
                      onChange={(e) => updateQuestion(q.id, { revision: e.target.checked })}
                    />
                    Needs Revision
                  </label>
                </div>
              </div>

              {q.notes && (
                <div className="mb-4 bg-darker p-3 rounded border border-gray-800 text-sm text-gray-300 flex items-start gap-2 max-h-24 overflow-y-auto">
                   <FaBook className="mt-1 text-gray-500 shrink-0" />
                   <p className="whitespace-pre-wrap">{q.notes}</p>
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-gray-800 flex justify-end gap-3">
                <button 
                  onClick={() => deleteQuestion(q.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredQuestions.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-10 text-gray-500 glassmorphism">
            <p>No questions found. Add some or change filters.</p>
          </div>
        )}
      </div>

      {isModalOpen && <AddQuestionModal onClose={() => setIsModalOpen(false)} />}
      
      {previewVideo && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={() => setPreviewVideo(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl aspect-video bg-darker rounded-xl overflow-hidden border border-gray-800 relative shadow-neon" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setPreviewVideo(null)} 
              className="absolute top-4 right-4 text-white z-10 bg-black/50 p-2 rounded-full hover:bg-red-500 transition-colors"
            >
              <FaTimes />
            </button>
            <iframe 
              className="w-full h-full"
              src={getYouTubeEmbedUrl(previewVideo)}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Tracker;
