import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#00f0ff', '#b026ff', '#39ff14', '#ff0055', '#f97316', '#eab308'];

const Analytics = () => {
  const { questions } = useContext(AppContext);

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "leetcode-tracker-backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const topicData = useMemo(() => {
    const counts = {};
    questions.forEach(q => {
      if (q.completed) {
        counts[q.topic] = (counts[q.topic] || 0) + 1;
      }
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] })).sort((a,b) => b.value - a.value);
  }, [questions]);

  const heatmapData = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const data = Array.from({length: 140}, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (139 - i));
      return { date: d.toDateString(), count: 0 };
    });

    questions.forEach(q => {
      if (q.completed) {
         const dateStr = new Date(q.dateAdded).toDateString();
         const existing = data.find(d => d.date === dateStr);
         if (existing) existing.count++;
      }
    });
    return data;
  }, [questions]);

  return (
    <div className="p-6 md:p-10 h-full flex flex-col overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-white">Advanced <span className="text-neonBlue">Analytics</span></h2>
        <button 
          onClick={exportData}
          className="flex items-center gap-2 bg-darker border border-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:border-neonBlue hover:text-neonBlue transition-all shadow-[0_0_15px_rgba(0,240,255,0)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        >
          <FaDownload /> Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1 auto-rows-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism p-6 flex flex-col border border-gray-800"
        >
          <h3 className="mb-4 text-xl font-bold text-white">Activity Heatmap</h3>
          <p className="text-sm text-gray-400 mb-6">Your coding activity over the last 140 days.</p>
          
          <div className="flex flex-wrap gap-1 md:gap-1.5 justify-start">
            {heatmapData.map((day, i) => {
              let bg = 'bg-gray-800';
              if (day.count === 1) bg = 'bg-neonBlue/40 shadow-[0_0_5px_#00f0ff]';
              if (day.count === 2) bg = 'bg-neonBlue/70 shadow-[0_0_10px_#00f0ff]';
              if (day.count >= 3) bg = 'bg-neonBlue shadow-[0_0_15px_#00f0ff]';
              
              return (
                <div 
                  key={i} 
                  title={`${day.count} questions on ${day.date}`}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${bg} transition-all duration-300 hover:scale-125 cursor-pointer`}
                ></div>
              );
            })}
          </div>
          
          <div className="mt-6 flex items-center justify-end gap-2 text-xs text-gray-400">
            <span>Less</span>
            <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
            <div className="w-3 h-3 bg-neonBlue/40 rounded-sm"></div>
            <div className="w-3 h-3 bg-neonBlue/70 rounded-sm"></div>
            <div className="w-3 h-3 bg-neonBlue rounded-sm"></div>
            <span>More</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glassmorphism p-6 flex flex-col border border-gray-800"
        >
          <h3 className="mb-4 text-xl font-bold text-white">Topic Distribution</h3>
          <p className="text-sm text-gray-400 mb-2">Breakdown of topics you've practiced most.</p>
          
          <div className="w-full h-72">
            {topicData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {topicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ filter: `drop-shadow(0 0 5px ${COLORS[index % COLORS.length]})` }} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#060809', borderColor: '#1f2937', borderRadius: '8px' }} 
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: '#ccc' }}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Not enough data to display topics.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
