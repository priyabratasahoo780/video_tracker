import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const AddQuestionModal = ({ onClose }) => {
  const { addQuestion, addQuestionsBulk } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('single');
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    link: '',
    notes: '',
    completed: false,
    longVideoEdited: false,
    longVideoUploaded: false,
    longVideoUrl: '',
    shortVideoEdited: false,
    shortVideoUploaded: false,
    shortVideoUrl: '',
    revision: false
  });

  const [bulkData, setBulkData] = useState({
    text: '',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing'
  });

  const topics = [
    'Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack', 
    'Binary Search', 'Linked List', 'Trees', 'Tries', 'Heap / Priority Queue', 
    'Backtracking', 'Graphs', '1-D DP', '2-D DP', 'Greedy', 'Math & Geometry', 'Bit Manipulation'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'single') {
      if (!formData.name || !formData.number) return;
      addQuestion(formData);
    } else {
      if (!bulkData.text.trim()) return;
      const lines = bulkData.text.split('\n');
      const parsed = [];
      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        
        let number = 0;
        let name = trimmed;
        
        const match = trimmed.match(/^(\d+)[\.\s\-–—]+(.*)$/);
        if (match) {
          number = parseInt(match[1], 10);
          name = match[2].trim();
        }
        
        parsed.push({
          number,
          name,
          difficulty: bulkData.difficulty,
          topic: bulkData.topic
        });
      });
      
      if (parsed.length > 0) {
        addQuestionsBulk(parsed);
      }
    }
    onClose();
  };

  const handleBulkChange = (e) => {
    const { name, value } = e.target;
    setBulkData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="glassmorphism w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-darker/50">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white">Add LeetCode Questions</h3>
            <div className="flex gap-4 mt-2">
              <button 
                type="button"
                onClick={() => setActiveTab('single')}
                className={`text-sm font-semibold pb-1 border-b-2 transition-all ${activeTab === 'single' ? 'text-neonBlue border-neonBlue' : 'text-gray-400 border-transparent hover:text-gray-300'}`}
              >
                Single Question
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('multiple')}
                className={`text-sm font-semibold pb-1 border-b-2 transition-all ${activeTab === 'multiple' ? 'text-neonBlue border-neonBlue' : 'text-gray-400 border-transparent hover:text-gray-300'}`}
              >
                Bulk Import (Multiple)
              </button>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FaTimes />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form id="add-q-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            {activeTab === 'single' ? (
              <>
            <div className="flex gap-4">
              <div className="w-1/3">
                <label className="block text-sm text-gray-400 mb-1">Number</label>
                <input required type="number" name="number" value={formData.number} onChange={handleChange} className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none" />
              </div>
              <div className="w-2/3">
                <label className="block text-sm text-gray-400 mb-1">Question Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm text-gray-400 mb-1">Difficulty</label>
                <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm text-gray-400 mb-1">Topic</label>
                <select name="topic" value={formData.topic} onChange={handleChange} className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none">
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">LeetCode Link</label>
              <input type="url" name="link" value={formData.link} onChange={handleChange} placeholder="https://leetcode.com/problems/..." className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none" />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Notes / Intuition</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none"></textarea>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm text-gray-400 mb-1">Long Video YouTube URL</label>
                <input type="url" name="longVideoUrl" value={formData.longVideoUrl} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none" />
              </div>
              <div className="w-1/2">
                <label className="block text-sm text-gray-400 mb-1">Short Video YouTube URL</label>
                <input type="url" name="shortVideoUrl" value={formData.shortVideoUrl} onChange={handleChange} placeholder="https://youtube.com/shorts/..." className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2 bg-darker/50 p-4 rounded-lg border border-gray-800">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input type="checkbox" name="completed" checked={formData.completed} onChange={handleChange} className="accent-green-500 w-4 h-4" />
                Completed
              </label>
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input type="checkbox" name="revision" checked={formData.revision} onChange={handleChange} className="accent-orange-500 w-4 h-4" />
                Needs Revision
              </label>
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input type="checkbox" name="longVideoEdited" checked={formData.longVideoEdited} onChange={handleChange} className="accent-blue-500 w-4 h-4" />
                Long Video Edited
              </label>
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input type="checkbox" name="longVideoUploaded" checked={formData.longVideoUploaded} onChange={handleChange} className="accent-blue-500 w-4 h-4" />
                Long Video Uploaded
              </label>
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input type="checkbox" name="shortVideoEdited" checked={formData.shortVideoEdited} onChange={handleChange} className="accent-pink-500 w-4 h-4" />
                Short Video Edited
              </label>
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input type="checkbox" name="shortVideoUploaded" checked={formData.shortVideoUploaded} onChange={handleChange} className="accent-pink-500 w-4 h-4" />
                Short Video Uploaded
              </label>
            </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Paste Questions (one per line)</label>
                  <textarea 
                    required
                    name="text"
                    value={bulkData.text}
                    onChange={handleBulkChange}
                    rows="6"
                    placeholder={`e.g.&#10;1. Two Sum&#10;121. Best Time to Buy and Sell Stock&#10;Trapping Rain Water`}
                    className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none placeholder-gray-600 font-mono text-sm"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">Accepts formats like "1. Name" or just "Name". Default values below will apply to all questions in this batch.</p>
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-400 mb-1">Default Difficulty</label>
                    <select name="difficulty" value={bulkData.difficulty} onChange={handleBulkChange} className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none">
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-400 mb-1">Default Topic</label>
                    <select name="topic" value={bulkData.topic} onChange={handleBulkChange} className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none">
                      {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="p-4 border-t border-gray-800 bg-darker/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">Cancel</button>
          <button type="submit" form="add-q-form" className="bg-neonBlue text-darker font-bold px-6 py-2 rounded-lg hover:shadow-neon transition-all">
            {activeTab === 'single' ? 'Save Question' : 'Import Questions'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddQuestionModal;
