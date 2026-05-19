import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FaFire, FaCode, FaVideo, FaEdit } from 'react-icons/fa';

const Dashboard = () => {
  const { questions } = useContext(AppContext);
  
  const totalCompleted = questions.filter(q => q.completed).length;
  const totalLongVideos = questions.filter(q => q.longVideoUploaded).length;
  const totalShortVideos = questions.filter(q => q.shortVideoUploaded).length;
  
  const easyTotal = questions.filter(q => q.difficulty === 'Easy').length;
  const mediumTotal = questions.filter(q => q.difficulty === 'Medium').length;
  const hardTotal = questions.filter(q => q.difficulty === 'Hard').length;

  const easyCount = questions.filter(q => q.completed && q.difficulty === 'Easy').length;
  const mediumCount = questions.filter(q => q.completed && q.difficulty === 'Medium').length;
  const hardCount = questions.filter(q => q.completed && q.difficulty === 'Hard').length;

  // Calculate actual daily streak based on question completion dates
  const dailyStreak = useMemo(() => {
    const completedQuestions = questions.filter(q => q.completed);
    if (completedQuestions.length === 0) return 0;
    
    const uniqueDates = [...new Set(completedQuestions.map(q => new Date(q.dateAdded).toDateString()))]
      .map(dateStr => new Date(dateStr))
      .sort((a, b) => b - a);

    if (uniqueDates.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);

    const firstDate = uniqueDates[0];
    const diffTime = Math.abs(currentDate - firstDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    // If the last activity wasn't today or yesterday, streak is lost
    if (diffDays > 1) return 0;

    let checkDate = new Date(firstDate);
    for (let i = 0; i < uniqueDates.length; i++) {
      const qDate = uniqueDates[i];
      if (qDate.getTime() === checkDate.getTime()) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, [questions]);

  return (
    <div className="p-6 md:p-10 w-full h-full">
      <h2 className="text-3xl font-bold mb-8 text-white">
        Welcome back, <span className="text-neonBlue">Creator</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<FaCode />} title="Questions Solved" value={totalCompleted} color="var(--color-neonBlue)" glow="var(--shadow-neon)" />
        <StatCard icon={<FaVideo />} title="Long Videos" value={totalLongVideos} color="var(--color-neonPink)" glow="0 0 10px rgba(255, 0, 85, 0.5), 0 0 20px rgba(255, 0, 85, 0.3)" />
        <StatCard icon={<FaVideo />} title="Short Videos" value={totalShortVideos} color="var(--color-neonGreen)" glow="0 0 10px rgba(57, 255, 20, 0.5), 0 0 20px rgba(57, 255, 20, 0.3)" />
        <StatCard icon={<FaFire />} title="Daily Streak" value={dailyStreak} color="#f97316" glow="0 0 10px rgba(249, 115, 22, 0.5), 0 0 20px rgba(249, 115, 22, 0.3)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glassmorphism p-6"
        >
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Recent Activity</h3>
          <div className="flex flex-col gap-3">
            {[...questions].sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 5).map(q => (
              <div key={q.id} className="flex justify-between items-center bg-darker p-3 rounded-lg border border-gray-800 transition hover:border-gray-600">
                <div>
                  <span className="text-gray-400 text-sm font-mono">#{q.number}</span>
                  <p className="font-medium text-gray-200">{q.name}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold ${
                  q.difficulty === 'Easy' ? 'text-green-400 bg-green-400/10' :
                  q.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-400/10' :
                  'text-red-400 bg-red-400/10'
                }`}>
                  {q.difficulty}
                </div>
              </div>
            ))}
            {questions.length === 0 && <p className="text-gray-500 py-4 text-center">No recent activity. Start tracking questions!</p>}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism p-6 flex flex-col items-center justify-start relative"
        >
          <h3 className="text-xl font-semibold w-full mb-6 border-b border-gray-700 pb-2 text-left">Difficulty Stats</h3>
          
          <div className="w-full flex flex-col gap-6 mt-4">
             <ProgressBar label="Easy" count={easyCount} total={easyTotal} color="bg-green-500" shadow="shadow-[0_0_10px_#22c55e]" />
             <ProgressBar label="Medium" count={mediumCount} total={mediumTotal} color="bg-yellow-500" shadow="shadow-[0_0_10px_#eab308]" />
             <ProgressBar label="Hard" count={hardCount} total={hardTotal} color="bg-red-500" shadow="shadow-[0_0_10px_#ef4444]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color, glow }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glassmorphism p-6 flex items-center gap-4 relative overflow-hidden group border border-gray-800 hover:border-gray-600 transition-colors"
    >
      <div className={`text-4xl p-3 rounded-xl bg-white/5 transition-all duration-300 group-hover:scale-110`}
           style={{ color: color, filter: `drop-shadow(${glow})` }}>
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
    </motion.div>
  );
};

const ProgressBar = ({ label, count, total, color, shadow }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400 font-mono">{count} / {total}</span>
      </div>
      <div className="w-full h-3 bg-darker rounded-full overflow-hidden border border-gray-800">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
          className={`h-full ${color} ${shadow}`}
        />
      </div>
    </div>
  )
}

export default Dashboard;
