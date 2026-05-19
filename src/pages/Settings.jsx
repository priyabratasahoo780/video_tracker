import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Settings = () => {
  const { settings, updateSettings, clearAllData } = useContext(AppContext);

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all data? This action is irreversible.")) {
      clearAllData();
      alert("All data cleared successfully.");
    }
  };

  return (
    <div className="p-6 md:p-10 h-full flex flex-col">
      <h2 className="text-3xl font-bold text-white mb-8">App <span className="text-neonBlue">Settings</span></h2>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism p-6 max-w-2xl"
      >
        <h3 className="text-xl font-bold text-gray-200 mb-6">Preferences</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-200">Dark Mode</p>
              <p className="text-gray-400 text-sm mt-1">Toggle dark/light theme (dynamically updates all components)</p>
            </div>
            <ToggleSwitch 
              isActive={settings.darkMode} 
              onToggle={() => updateSettings('darkMode', !settings.darkMode)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-200">Confetti Animations</p>
              <p className="text-sm text-gray-400">Play animation on question complete</p>
            </div>
            <ToggleSwitch 
              isActive={settings.confetti} 
              onToggle={() => updateSettings('confetti', !settings.confetti)} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-200">Notifications</p>
              <p className="text-sm text-gray-400">Daily reminder to practice (requires permissions)</p>
            </div>
            <ToggleSwitch 
              isActive={settings.notifications} 
              onToggle={() => {
                if (!settings.notifications) {
                  if ("Notification" in window) {
                    Notification.requestPermission().then(permission => {
                      if (permission === "granted") {
                        updateSettings('notifications', true);
                        new Notification("Notifications Enabled! 🚀", {
                          body: "You will now receive daily reminders to practice LeetCode!"
                        });
                      } else {
                        alert("Please allow notifications in your browser settings to enable this feature.");
                      }
                    });
                  } else {
                    alert("Your browser does not support notifications.");
                  }
                } else {
                  updateSettings('notifications', false);
                }
              }} 
            />
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-800">
          <h3 className="text-xl font-bold text-red-500 mb-4">Danger Zone</h3>
          <button 
            onClick={handleClearData}
            className="bg-red-500/20 text-red-500 border border-red-500 px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all w-full text-left flex justify-between items-center group shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
          >
            <span className="font-medium">Clear All Data</span>
            <span className="text-sm border border-red-500 px-2 rounded bg-red-500/10 group-hover:bg-red-600 transition-colors">Irreversible</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ToggleSwitch = ({ isActive, onToggle }) => {
  return (
    <div 
      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${isActive ? 'bg-neonBlue shadow-neon' : 'bg-gray-700'}`}
      onClick={onToggle}
    >
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-4 h-4 bg-white rounded-full absolute top-1"
        style={{ left: isActive ? 'calc(100% - 1.25rem)' : '0.25rem' }}
      />
    </div>
  );
};

export default Settings;
