import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('leetcode-questions');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('leetcode-settings');
    return saved ? JSON.parse(saved) : {
      darkMode: true,
      confetti: true,
      notifications: false
    };
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('leetcode-profile');
    return saved ? JSON.parse(saved) : {
      name: 'Creator Pro',
      title: 'Software Engineer & YouTuber',
      email: 'creator@example.com',
      leetcodeUrl: 'leetcode.com/creator',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      avatarUrl: ''
    };
  });
  
  useEffect(() => {
    localStorage.setItem('leetcode-questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('leetcode-profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('leetcode-settings', JSON.stringify(settings));
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const addQuestion = (q) => {
    setQuestions([...questions, { id: uuidv4(), dateAdded: new Date().toISOString(), ...q }]);
  };

  const addQuestionsBulk = (newQsList) => {
    const formatted = newQsList.map(q => ({
      id: uuidv4(),
      dateAdded: new Date().toISOString(),
      completed: false,
      longVideoEdited: false,
      longVideoUploaded: false,
      longVideoUrl: '',
      shortVideoEdited: false,
      shortVideoUploaded: false,
      shortVideoUrl: '',
      revision: false,
      link: '',
      notes: '',
      ...q
    }));
    setQuestions(prev => [...prev, ...formatted]);
  };

  const updateQuestion = (id, updatedFields) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updatedFields } : q));
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateSettings = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateProfile = (updatedFields) => {
    setProfile(prev => ({ ...prev, ...updatedFields }));
  };

  const loadDemoData = () => {
    const dummy = [
      {
        id: uuidv4(),
        number: 1,
        name: 'Two Sum',
        difficulty: 'Easy',
        topic: 'Arrays & Hashing',
        link: 'https://leetcode.com/problems/two-sum/',
        notes: 'Use a hash map to store the difference and its index.',
        completed: true,
        longVideoEdited: true,
        longVideoUploaded: true,
        shortVideoEdited: true,
        shortVideoUploaded: true,
        revision: false,
        dateAdded: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: uuidv4(),
        number: 121,
        name: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        topic: 'Arrays & Hashing',
        link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        notes: 'Keep track of min price so far. Calculate max profit at each step.',
        completed: true,
        longVideoEdited: true,
        longVideoUploaded: false,
        shortVideoEdited: true,
        shortVideoUploaded: true,
        revision: true,
        dateAdded: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: uuidv4(),
        number: 15,
        name: '3Sum',
        difficulty: 'Medium',
        topic: 'Two Pointers',
        link: 'https://leetcode.com/problems/3sum/',
        notes: 'Sort the array first. Fix one pointer, use two pointers for the rest. Skip duplicates.',
        completed: false,
        longVideoEdited: false,
        longVideoUploaded: false,
        shortVideoEdited: false,
        shortVideoUploaded: false,
        revision: false,
        dateAdded: new Date().toISOString()
      },
      {
        id: uuidv4(),
        number: 42,
        name: 'Trapping Rain Water',
        difficulty: 'Hard',
        topic: 'Two Pointers',
        link: 'https://leetcode.com/problems/trapping-rain-water/',
        notes: 'Use two pointers from left and right. Keep track of left_max and right_max.',
        completed: true,
        longVideoEdited: false,
        longVideoUploaded: false,
        shortVideoEdited: true,
        shortVideoUploaded: false,
        revision: true,
        dateAdded: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ];
    setQuestions(dummy);
  };

  const clearAllData = () => {
    setQuestions([]);
    localStorage.removeItem('leetcode-questions');
    
    setProfile({
      name: 'Creator Pro',
      title: 'Software Engineer & YouTuber',
      email: 'creator@example.com',
      leetcodeUrl: 'leetcode.com/creator',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      avatarUrl: ''
    });
    localStorage.removeItem('leetcode-profile');
    
    setSettings({
      darkMode: true,
      confetti: true,
      notifications: false
    });
    localStorage.removeItem('leetcode-settings');
  };

  return (
    <AppContext.Provider value={{ questions, addQuestion, addQuestionsBulk, updateQuestion, deleteQuestion, settings, updateSettings, clearAllData, loadDemoData, profile, updateProfile, sidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
};
