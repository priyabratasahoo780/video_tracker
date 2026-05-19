import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { profile, updateProfile } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 md:p-10 h-full flex flex-col overflow-y-auto">
      <h2 className="text-3xl font-bold text-white mb-8">User <span className="text-neonBlue">Profile</span></h2>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism p-6 max-w-2xl border border-gray-800"
      >
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-2 border-neonBlue shadow-[0_0_15px_rgba(0,240,255,0.6)] overflow-hidden">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl">🧑‍💻</span>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
            <p className="text-gray-400">{profile.title}</p>
          </div>
        </div>
        
        {!isEditing ? (
          <>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">Email</span>
                <span className="text-gray-200">{profile.email}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">Join Date</span>
                <span className="text-gray-200">{profile.joinDate}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">LeetCode Profile</span>
                <a href={profile.leetcodeUrl.startsWith('http') ? profile.leetcodeUrl : `https://${profile.leetcodeUrl}`} target="_blank" rel="noreferrer" className="text-neonBlue hover:underline transition-colors">
                  {profile.leetcodeUrl}
                </a>
              </div>
            </div>
            
            <button 
              onClick={() => { setFormData(profile); setIsEditing(true); }}
              className="mt-8 flex items-center justify-center gap-2 bg-neonBlue/20 text-neonBlue border border-neonBlue px-6 py-2 rounded-lg hover:bg-neonBlue hover:text-darker transition-all w-full shadow-[0_0_10px_rgba(0,240,255,0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.8)]"
            >
              <FaEdit /> Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 mt-6 border-t border-gray-800 pt-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Display Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none transition-colors" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title / Bio</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none transition-colors" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none transition-colors" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">LeetCode URL</label>
              <input type="text" name="leetcodeUrl" value={formData.leetcodeUrl} onChange={handleChange} className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none transition-colors" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Avatar Image URL (Optional)</label>
              <input type="url" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} placeholder="https://example.com/avatar.jpg" className="w-full bg-darker border border-gray-700 rounded-lg p-2 text-white focus:border-neonBlue focus:outline-none transition-colors" />
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="flex-1 flex justify-center items-center gap-2 bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaTimes /> Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 flex justify-center items-center gap-2 bg-neonGreen/20 text-neonGreen border border-neonGreen px-4 py-2 rounded-lg hover:bg-neonGreen hover:text-darker transition-all shadow-[0_0_10px_#39ff14]"
              >
                <FaSave /> Save Changes
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
