import React, { useState, useCallback, useMemo, useEffect } from "react";
import usePersistentState from "../hooks/usePersistentState";
import useTheme from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  HiOutlineCheckCircle,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineFolder,
  HiOutlinePlus,
  HiOutlineUser,
  HiOutlineUpload,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineChat,
  HiOutlineBell,
  HiOutlineChartBar,
  HiOutlineCloudDownload,
  HiOutlineLocationMarker,
  HiOutlineMicrophone,
  HiOutlinePhotograph,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineFire,
  HiOutlineGlobeAlt,
  HiOutlineDesktopComputer,
  HiOutlineLightningBolt,
  HiOutlineAdjustments,
  HiOutlineCollection,
  HiOutlineShare,
  HiOutlinePlay,
  HiOutlineRefresh,
  HiOutlineTrendingUp,
  HiOutlineCamera,
  HiOutlineCode,
  HiOutlineCube,
  HiOutlineDatabase,
} from "react-icons/hi";

// Enhanced Theme Toggle Component
function ThemeToggle() {
  const [theme, toggleTheme] = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        animate={{ rotate: theme === 'dark' ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {theme === 'dark' ? (
          <HiOutlineSun className="w-5 h-5 text-amber-500" />
        ) : (
          <HiOutlineMoon className="w-5 h-5 text-blue-500" />
        )}
      </motion.div>
      <span className="text-sm font-medium">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </motion.button>
  );
}

// AI Recommendations Widget
function AIRecommendationsWidget() {
  const [recommendations] = useState([
    {
      id: 1,
      type: "task",
      title: "Review quarterly reports",
      priority: "high",
      aiConfidence: 95,
      reason: "Deadline approaching in 2 days"
    },
    {
      id: 2,
      type: "meeting",
      title: "Schedule team standup",
      priority: "medium",
      aiConfidence: 87,
      reason: "Last meeting was 5 days ago"
    },
    {
      id: 3,
      type: "break",
      title: "Take a 15-minute break",
      priority: "low",
      aiConfidence: 76,
      reason: "You've been working for 2.5 hours"
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-purple-200/50 dark:border-purple-800/50"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <HiOutlineSparkles className="text-purple-500" /> AI Recommendations
      </h3>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border border-purple-200/30 dark:border-purple-700/30"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-800 dark:text-white">{rec.title}</h4>
              <span className={`text-xs font-bold ${getPriorityColor(rec.priority)}`}>
                {rec.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{rec.reason}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">AI Confidence:</span>
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${rec.aiConfidence}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {rec.aiConfidence}%
                </span>
              </div>
              <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium">
                Apply
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Productivity Heatmap Widget
function ProductivityHeatmapWidget() {
  const generateHeatmapData = () => {
    const data = [];
    const hours = ['9', '10', '11', '12', '1', '2', '3', '4', '5'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    days.forEach((day, dayIndex) => {
      hours.forEach((hour, hourIndex) => {
        data.push({
          day: dayIndex,
          hour: hourIndex,
          value: Math.floor(Math.random() * 100),
          dayName: day,
          hourName: hour
        });
      });
    });
    return data;
  };

  const heatmapData = useMemo(() => generateHeatmapData(), []);

  const getIntensityColor = (value) => {
    if (value > 80) return 'bg-green-500';
    if (value > 60) return 'bg-green-400';
    if (value > 40) return 'bg-yellow-400';
    if (value > 20) return 'bg-orange-400';
    return 'bg-red-400';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-blue-200/50 dark:border-blue-800/50"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <HiOutlineFire className="text-orange-500" /> Productivity Heatmap
      </h3>
      <div className="space-y-2">
        <div className="flex gap-1 text-xs text-gray-600 dark:text-gray-400 pl-8">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="w-6 text-center">{9 + i > 12 ? 9 + i - 12 : 9 + i}</div>
          ))}
        </div>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, dayIndex) => (
          <div key={day} className="flex items-center gap-1">
            <div className="w-6 text-xs text-gray-600 dark:text-gray-400">{day}</div>
            {Array.from({ length: 9 }, (_, hourIndex) => {
              const dataPoint = heatmapData.find(d => d.day === dayIndex && d.hour === hourIndex);
              return (
                <motion.div
                  key={`${dayIndex}-${hourIndex}`}
                  whileHover={{ scale: 1.2 }}
                  className={`w-6 h-6 rounded ${getIntensityColor(dataPoint?.value || 0)} cursor-pointer`}
                  title={`${day} ${dataPoint?.hourName}:00 - ${dataPoint?.value}% productive`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span>Less productive</span>
        <div className="flex gap-1">
          {[20, 40, 60, 80, 100].map(val => (
            <div key={val} className={`w-3 h-3 rounded ${getIntensityColor(val)}`} />
          ))}
        </div>
        <span>More productive</span>
      </div>
    </motion.div>
  );
}

// Voice Command Interface
function VoiceCommandWidget() {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const [voiceSupported] = useState('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  const startListening = () => {
    if (!voiceSupported) {
      alert("Voice commands are not supported in your browser");
      return;
    }

    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      const commands = [
        "Create new task",
        "Show today's schedule",
        "Open analytics",
        "Start timer",
        "Upload file"
      ];
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setLastCommand(randomCommand);
      setIsListening(false);
    }, 2000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-green-200/50 dark:border-green-800/50"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <HiOutlineMicrophone className="text-green-500" /> Voice Commands
      </h3>
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startListening}
          disabled={isListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isListening
            ? 'bg-red-500 animate-pulse'
            : 'bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
            }`}
        >
          <HiOutlineMicrophone className="w-8 h-8 text-white" />
        </motion.button>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          {isListening ? "Listening..." : "Click to start voice command"}
        </p>
        {lastCommand && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg"
          >
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              Last command: "{lastCommand}"
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Image Analysis Widget
function ImageAnalysisWidget() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeImage = (file) => {
    setIsAnalyzing(true);
    setSelectedImage(URL.createObjectURL(file));

    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        objects: ["laptop", "coffee cup", "notebook", "pen"],
        text: "Meeting notes for Q4 planning",
        emotions: ["focused", "professional"],
        colors: ["#4A90E2", "#F5A623", "#50E3C2"],
        confidence: 94
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-indigo-200/50 dark:border-indigo-800/50"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <HiOutlineCamera className="text-indigo-500" /> Image Analysis
      </h3>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl p-4 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files[0] && analyzeImage(e.target.files[0])}
            className="hidden"
            id="imageInput"
          />
          <label htmlFor="imageInput" className="cursor-pointer">
            <HiOutlinePhotograph className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Upload an image for AI analysis
            </p>
          </label>
        </div>

        {selectedImage && (
          <div className="space-y-3">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-32 object-cover rounded-lg"
            />

            {isAnalyzing ? (
              <div className="flex items-center justify-center p-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  Analyzing...
                </span>
              </div>
            ) : analysis && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 space-y-2"
              >
                <div>
                  <span className="text-xs font-medium text-gray-500">Objects:</span>
                  <p className="text-sm text-gray-800 dark:text-white">
                    {analysis.objects.join(", ")}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">Text detected:</span>
                  <p className="text-sm text-gray-800 dark:text-white">
                    {analysis.text}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Confidence:</span>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {analysis.confidence}%
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Real-time Team Presence
function TeamPresenceWidget() {
  const [teamMembers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "online",
      activity: "Working on design system",
      lastSeen: "now"
    },
    {
      id: 2,
      name: "Maria Garcia",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      status: "away",
      activity: "In a meeting",
      lastSeen: "5 min ago"
    },
    {
      id: 3,
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      status: "offline",
      activity: "Last worked on API docs",
      lastSeen: "2 hours ago"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-cyan-200/50 dark:border-cyan-800/50"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <HiOutlineUserGroup className="text-cyan-500" /> Team Presence
      </h3>
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white dark:border-gray-800`} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 dark:text-white text-sm">
                {member.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {member.activity}
              </p>
              <p className="text-xs text-gray-500">
                {member.lastSeen}
              </p>
            </div>
            <div className="flex gap-1">
              <button className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition">
                <HiOutlineChat className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </button>
              <button className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition">
                <HiOutlineDesktopComputer className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Time Tracking Widget
function TimeTrackingWidget() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState("Design Review");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [todayTotal] = useState(435); // minutes

  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-orange-200/50 dark:border-orange-800/50"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <HiOutlineClock className="text-orange-500" /> Time Tracking
      </h3>

      <div className="text-center mb-4">
        <div className="text-3xl font-mono font-bold text-gray-800 dark:text-white mb-2">
          {formatTime(timeElapsed)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {currentTask}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsTracking(!isTracking)}
          className={`px-6 py-2 rounded-full font-medium transition-all ${isTracking
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
        >
          {isTracking ? 'Stop' : 'Start'} Timer
        </motion.button>
      </div>

      <div className="border-t border-orange-200 dark:border-orange-800 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">Today's Total</span>
          <span className="font-medium text-gray-800 dark:text-white">
            {formatMinutes(todayTotal)}
          </span>
        </div>
        <div className="w-full bg-orange-200 dark:bg-orange-900/50 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((todayTotal / 480) * 100, 100)}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Goal: 8 hours
        </div>
      </div>
    </motion.div>
  );
}

// Quick Actions Hub
function QuickActionsHub() {
  const quickActions = [
    { id: 1, name: "New Task", icon: HiOutlinePlus, color: "bg-blue-500", action: () => { } },
    { id: 2, name: "Schedule Meeting", icon: HiOutlineCalendar, color: "bg-green-500", action: () => { } },
    { id: 3, name: "Upload File", icon: HiOutlineUpload, color: "bg-purple-500", action: () => { } },
    { id: 4, name: "Send Message", icon: HiOutlineChat, color: "bg-pink-500", action: () => { } },
    { id: 5, name: "Create Note", icon: HiOutlinePencilAlt, color: "bg-yellow-500", action: () => { } },
    { id: 6, name: "Start Timer", icon: HiOutlinePlay, color: "bg-red-500", action: () => { } }
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <HiOutlineLightningBolt className="text-yellow-500" /> Quick Actions
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.action}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 transition-all border border-gray-200/50 dark:border-gray-600/50"
            >
              <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                {action.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// Enhanced Analytics Dashboard
function AdvancedAnalyticsWidget() {
  const analyticsData = useMemo(() => ({
    tasksCompleted: { today: 8, week: 42, change: +15 },
    timeSpent: { today: 6.5, week: 38.2, change: +8 },
    productivity: { score: 87, trend: "up", change: +5 },
    collaboration: { messages: 23, meetings: 4, change: +12 }
  }), []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-violet-200/50 dark:border-violet-800/50"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <HiOutlineChartBar className="text-violet-500" /> Advanced Analytics
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Tasks</span>
            <span className="text-xs text-green-600 font-medium">+{analyticsData.tasksCompleted.change}%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {analyticsData.tasksCompleted.today}
          </div>
          <div className="text-xs text-gray-500">Today</div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Hours</span>
            <span className="text-xs text-green-600 font-medium">+{analyticsData.timeSpent.change}%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {analyticsData.timeSpent.today}
          </div>
          <div className="text-xs text-gray-500">Today</div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Productivity</span>
            <HiOutlineTrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {analyticsData.productivity.score}%
          </div>
          <div className="text-xs text-gray-500">Score</div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Messages</span>
            <span className="text-xs text-blue-600 font-medium">+{analyticsData.collaboration.change}%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {analyticsData.collaboration.messages}
          </div>
          <div className="text-xs text-gray-500">Today</div>
        </div>
      </div>
    </motion.div>
  );
}

// Workflow Automation Builder
function WorkflowBuilderWidget() {
  const [workflows] = useState([
    {
      id: 1,
      name: "Daily Standup Reminder",
      trigger: "9:00 AM",
      action: "Send team notification",
      active: true
    },
    {
      id: 2,
      name: "Task Deadline Alert",
      trigger: "1 day before due",
      action: "Email reminder",
      active: true
    },
    {
      id: 3,
      name: "Weekly Report",
      trigger: "Friday 5 PM",
      action: "Generate summary",
      active: false
    }
  ]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-emerald-200/50 dark:border-emerald-800/50"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <HiOutlineAdjustments className="text-emerald-500" /> Automation
      </h3>

      <div className="space-y-3">
        {workflows.map((workflow) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 dark:text-white text-sm">
                {workflow.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {workflow.trigger} → {workflow.action}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${workflow.active ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="text-xs text-gray-500">
                {workflow.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 p-3 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
      >
        + Create New Workflow
      </motion.button>
    </motion.div>
  );
}

// Enhanced Weather Widget with Extended Forecast
function EnhancedWeatherWidget() {
  const [weather] = useState({
    current: {
      location: "New York, NY",
      temperature: "24°C",
      condition: "Partly Cloudy",
      humidity: "65%",
      wind: "12 km/h",
      pressure: "1013 hPa",
      visibility: "10 km"
    },
    forecast: [
      { day: "Today", high: 26, low: 18, condition: "Partly Cloudy", icon: "⛅" },
      { day: "Tomorrow", high: 28, low: 20, condition: "Sunny", icon: "☀️" },
      { day: "Wednesday", high: 23, low: 16, condition: "Rainy", icon: "🌧️" },
      { day: "Thursday", high: 25, low: 17, condition: "Cloudy", icon: "☁️" }
    ]
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-sky-200/50 dark:border-sky-800/50"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <HiOutlineGlobeAlt className="text-sky-500" /> Weather
      </h3>

      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
              {weather.current.temperature}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">{weather.current.condition}</p>
            <p className="text-sm text-gray-500">{weather.current.location}</p>
          </div>
          <div className="text-6xl">⛅</div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-3">
            <span className="text-gray-500">Humidity</span>
            <div className="font-medium text-gray-800 dark:text-white">
              {weather.current.humidity}
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-3">
            <span className="text-gray-500">Wind</span>
            <div className="font-medium text-gray-800 dark:text-white">
              {weather.current.wind}
            </div>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div>
        <h5 className="font-medium text-gray-800 dark:text-white mb-3">4-Day Forecast</h5>
        <div className="space-y-2">
          {weather.forecast.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/70 dark:bg-gray-800/70 rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{day.icon}</span>
                <div>
                  <div className="font-medium text-gray-800 dark:text-white text-sm">
                    {day.day}
                  </div>
                  <div className="text-xs text-gray-500">{day.condition}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-800 dark:text-white text-sm">
                  {day.high}°
                </div>
                <div className="text-xs text-gray-500">{day.low}°</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Notification Center
function EnhancedNotificationCenter() {
  const [notifications] = useState([
    {
      id: 1,
      type: "task",
      title: "Task deadline approaching",
      message: "Q4 Planning Review due in 2 hours",
      time: "2 min ago",
      read: false,
      priority: "high",
      action: "View Task"
    },
    {
      id: 2,
      type: "message",
      title: "New message from Alex",
      message: "Hey, can we discuss the design changes?",
      time: "15 min ago",
      read: false,
      priority: "medium",
      action: "Reply"
    },
    {
      id: 3,
      type: "system",
      title: "Backup completed",
      message: "Your data has been successfully backed up",
      time: "1 hour ago",
      read: true,
      priority: "low",
      action: "View Details"
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'task': return <HiOutlineCheckCircle className="w-5 h-5 text-orange-500" />;
      case 'message': return <HiOutlineChat className="w-5 h-5 text-blue-500" />;
      case 'system': return <HiOutlineCube className="w-5 h-5 text-green-500" />;
      default: return <HiOutlineBell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowNotifications(!showNotifications)}
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 relative"
      >
        <HiOutlineBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-96 bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 backdrop-blur-md"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Notifications</h3>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                  Mark all read
                </button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map(notification => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                          {notification.action}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Enhanced Hero Section
function EnhancedHero() {
  const shouldReduceMotion = useReducedMotion();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      className="relative h-[35vh] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 rounded-3xl shadow-2xl mb-8 overflow-hidden"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.1 : 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60 pointer-events-none" />
      <div className="absolute top-6 right-6 text-white/90">
        <div className="text-right">
          <div className="text-2xl font-bold">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-sm opacity-80">
            {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.1 : 1.2, delay: 0.3 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2 tracking-tight">
          {getGreeting()}, Sophia
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium mb-6">
          Ready to make today productive?
        </p>
        <div className="flex items-center justify-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white"
          >
            <span className="text-sm font-medium">Today's Goal: 8/10 tasks</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white"
          >
            <span className="text-sm font-medium">Energy: 87%</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Sidebar Button Component
const SidebarButton = React.memo(function SidebarButton({ icon, children, onClick, active }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium group
        ${active
          ? "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 text-indigo-700 dark:text-indigo-200 shadow-md"
          : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm"
        }`}
    >
      <motion.div
        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
        className="transition-transform"
      >
        {icon}
      </motion.div>
      {children}
    </motion.button>
  );
});

// Modal Component
const Modal = React.memo(function Modal({ open, onClose, title, children }) {
  const shouldReduceMotion = useReducedMotion();

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 relative border border-gray-200/50 dark:border-gray-700/50"
          initial={{ scale: shouldReduceMotion ? 0.98 : 0.96, y: shouldReduceMotion ? 10 : 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: shouldReduceMotion ? 0.98 : 0.96, y: shouldReduceMotion ? 10 : 40 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <h3 className="text-2xl font-bold mb-6 dark:text-white">{title}</h3>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// Main Home Component
export default function Home() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Persistent state for all data
  const [tasks, setTasks] = usePersistentState("tasks", []);
  const [notes, setNotes] = usePersistentState("notes", []);
  const [contacts, setContacts] = usePersistentState("contacts", []);
  const [files, setFiles] = usePersistentState("files", []);

  // Modal and form states
  const [modal, setModal] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [file, setFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Optimized handlers
  const handleTaskSubmit = useCallback(e => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), title: taskTitle, created: new Date().toLocaleTimeString(), status: 'pending' }
    ]);
    setSuccessMsg("Task created successfully!");
    setTimeout(() => {
      setSuccessMsg(""); setModal(null); setTaskTitle("");
    }, 1500);
  }, [taskTitle, setTasks]);

  const handleRemoveTask = useCallback(id =>
    setTasks(prev => prev.filter(task => task.id !== id)),
    [setTasks]
  );

  const handleNoteSubmit = useCallback(e => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    setNotes(prev => [
      ...prev,
      { id: Date.now(), content: noteContent, created: new Date().toLocaleTimeString() }
    ]);
    setSuccessMsg("Note created successfully!");
    setTimeout(() => {
      setSuccessMsg(""); setModal(null); setNoteContent("");
    }, 1500);
  }, [noteContent, setNotes]);

  const handleRemoveNote = useCallback(id =>
    setNotes(prev => prev.filter(note => note.id !== id)),
    [setNotes]
  );

  const handleContactSubmit = useCallback(e => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) return;
    if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      setSuccessMsg("Please enter a valid email address!");
      setTimeout(() => setSuccessMsg(""), 2000);
      return;
    }
    setContacts(prev => [
      ...prev,
      { id: Date.now(), name: contactName, email: contactEmail, created: new Date().toLocaleTimeString() }
    ]);
    setSuccessMsg("Contact added successfully!");
    setTimeout(() => {
      setSuccessMsg(""); setModal(null); setContactName(""); setContactEmail("");
    }, 1500);
  }, [contactName, contactEmail, setContacts]);

  const handleRemoveContact = useCallback(id =>
    setContacts(prev => prev.filter(contact => contact.id !== id)),
    [setContacts]
  );

  const handleFileSubmit = useCallback(e => {
    e.preventDefault();
    if (!file) return;
    setFiles(prev => [
      ...prev,
      { id: Date.now(), name: file.name, size: file.size, created: new Date().toLocaleTimeString() }
    ]);
    setSuccessMsg("File uploaded successfully!");
    setTimeout(() => {
      setSuccessMsg(""); setModal(null); setFile(null);
    }, 1500);
  }, [file, setFiles]);

  const handleRemoveFile = useCallback(id =>
    setFiles(prev => prev.filter(file => file.id !== id)),
    [setFiles]
  );

  const handleNavigation = useCallback(path => navigate(path), [navigate]);

  // Animation variants for list items
  const listItemVariants = useMemo(() => ({
    initial: { opacity: 0, x: shouldReduceMotion ? 0 : -16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: shouldReduceMotion ? 0 : -16 },
    transition: { duration: shouldReduceMotion ? 0.1 : 0.3 }
  }), [shouldReduceMotion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col transition-colors">
      {/* Header with Enhanced Notifications and Theme Toggle */}
      <header className="flex justify-end items-center gap-4 p-6">
        <EnhancedNotificationCenter />
        <ThemeToggle />
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex w-full">
        {/* Enhanced Sidebar */}
        <aside className="w-72 bg-white/80 dark:bg-gray-900/80 border-r border-gray-200/50 dark:border-gray-800/50 flex flex-col p-8 gap-6 shadow-2xl backdrop-blur-xl">
          {/* User Profile Section */}
          <div className="flex items-center gap-4 mb-6">

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sophia Carter</h2>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">Product Designer</p>
              <div className="flex items-center gap-2 mt-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-green-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Online</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <SidebarButton icon={<HiOutlineFolder className="w-6 h-6" />} onClick={() => handleNavigation('/')} active>
              Dashboard
            </SidebarButton>
            <SidebarButton icon={<HiOutlineCheckCircle className="w-6 h-6" />} onClick={() => navigate('/tasks')}>
              Tasks
            </SidebarButton>
            <SidebarButton icon={<HiOutlineCalendar className="w-6 h-6" />} onClick={() => navigate('/calendar')}>
              Calendar
            </SidebarButton>
            <SidebarButton icon={<HiOutlineDocumentText className="w-6 h-6" />} onClick={() => navigate('/notes')}>
              Notes
            </SidebarButton>
            <SidebarButton icon={<HiOutlineUserGroup className="w-6 h-6" />} onClick={() => navigate('/contacts')}>
              Contacts
            </SidebarButton>
            <SidebarButton icon={<HiOutlineUpload className="w-6 h-6" />} onClick={() => navigate('/files')}>
              Files
            </SidebarButton>
            <SidebarButton icon={<HiOutlineChat className="w-6 h-6" />} onClick={() => navigate('/chat')}>
              AI Chat
            </SidebarButton>
            <SidebarButton icon={<HiOutlineChartBar className="w-6 h-6" />} onClick={() => navigate('/analytics')}>
              Analytics
            </SidebarButton>
          </nav>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 px-8 md:px-16 py-12 overflow-y-auto">
          <EnhancedHero />

          {/* Enhanced Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            <AIRecommendationsWidget />
            <ProductivityHeatmapWidget />
            <VoiceCommandWidget />
            <ImageAnalysisWidget />
            <TeamPresenceWidget />
            <TimeTrackingWidget />
            <QuickActionsHub />
            <AdvancedAnalyticsWidget />
            <WorkflowBuilderWidget />
            <EnhancedWeatherWidget />
          </div>

          {/* Recent Activity Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Recent Activity</h2>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
              <ol className="border-l-2 border-indigo-200 dark:border-indigo-900 pl-8 space-y-8">
                <AnimatePresence>
                  {tasks.length === 0 && notes.length === 0 && files.length === 0 && contacts.length === 0 && (
                    <motion.li
                      className="relative"
                      {...listItemVariants}
                    >
                      <div className="absolute -left-10 top-1.5 bg-white dark:bg-gray-900 border-2 border-indigo-200 dark:border-indigo-800 rounded-full p-2 shadow-lg">
                        <HiOutlineSparkles className="w-6 h-6 text-indigo-500" />
                      </div>
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200/50 dark:border-indigo-800/50">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Welcome to Lumina!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Start by creating your first task, note, contact, or uploading a file to see your activity here.
                        </p>
                      </div>
                    </motion.li>
                  )}

                  {tasks.map((task) => (
                    <motion.li
                      className="relative group"
                      key={task.id}
                      {...listItemVariants}
                    >
                      <div className="absolute -left-10 top-1.5 bg-white dark:bg-gray-900 border-2 border-green-200 dark:border-green-800 rounded-full p-2 shadow-lg">
                        <HiOutlineCheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200/50 dark:border-green-800/50 group-hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              Created Task: {task.title}
                            </h3>
                            <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                              {task.created}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRemoveTask(task.id)}
                            className="px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors font-medium opacity-0 group-hover:opacity-100"
                          >
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.li>
                  ))}

                  {notes.map((note) => (
                    <motion.li
                      className="relative group"
                      key={note.id}
                      {...listItemVariants}
                    >
                      <div className="absolute -left-10 top-1.5 bg-white dark:bg-gray-900 border-2 border-purple-200 dark:border-purple-800 rounded-full p-2 shadow-lg">
                        <HiOutlineDocumentText className="w-6 h-6 text-purple-500" />
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200/50 dark:border-purple-800/50 group-hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              Created Note
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              {note.content.slice(0, 100)}{note.content.length > 100 ? "..." : ""}
                            </p>
                            <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                              {note.created}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRemoveNote(note.id)}
                            className="px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors font-medium opacity-0 group-hover:opacity-100"
                          >
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.li>
                  ))}

                  {contacts.map((contact) => (
                    <motion.li
                      className="relative group"
                      key={contact.id}
                      {...listItemVariants}
                    >
                      <div className="absolute -left-10 top-1.5 bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800 rounded-full p-2 shadow-lg">
                        <HiOutlineUser className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50 group-hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              Added Contact: {contact.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              {contact.email}
                            </p>
                            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                              {contact.created}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRemoveContact(contact.id)}
                            className="px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors font-medium opacity-0 group-hover:opacity-100"
                          >
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.li>
                  ))}

                  {files.map((file) => (
                    <motion.li
                      className="relative group"
                      key={file.id}
                      {...listItemVariants}
                    >
                      <div className="absolute -left-10 top-1.5 bg-white dark:bg-gray-900 border-2 border-pink-200 dark:border-pink-800 rounded-full p-2 shadow-lg">
                        <HiOutlineUpload className="w-6 h-6 text-pink-500" />
                      </div>
                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6 border border-pink-200/50 dark:border-pink-800/50 group-hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              Uploaded File: {file.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <p className="text-pink-600 dark:text-pink-400 text-sm font-medium">
                              {file.created}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRemoveFile(file.id)}
                            className="px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors font-medium opacity-0 group-hover:opacity-100"
                          >
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ol>
            </div>
          </section>

          {/* Enhanced Quick Access */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "New Task", icon: HiOutlinePlus, action: () => setModal("task"), gradient: "from-blue-500 to-blue-600" },
                { label: "Create Note", icon: HiOutlinePencilAlt, action: () => setModal("note"), gradient: "from-purple-500 to-purple-600" },
                { label: "Add Contact", icon: HiOutlineUser, action: () => setModal("contact"), gradient: "from-green-500 to-green-600" },
                { label: "Upload File", icon: HiOutlineUpload, action: () => setModal("file"), gradient: "from-pink-500 to-pink-600" }
              ].map((item, index) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={item.action}
                  className={`flex flex-col items-center gap-4 p-8 bg-gradient-to-br ${item.gradient} text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <item.icon className="w-12 h-12" />
                  <span className="font-bold text-lg">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Enhanced Modals */}
      <Modal open={modal === "task"} onClose={() => setModal(null)} title="Create New Task">
        <form onSubmit={handleTaskSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter task title..."
              value={taskTitle}
              onChange={e => setTaskTitle(e.target.value)}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Create Task
          </motion.button>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 text-center font-medium"
            >
              {successMsg}
            </motion.div>
          )}
        </form>
      </Modal>

      <Modal open={modal === "note"} onClose={() => setModal(null)} title="Create New Note">
        <form onSubmit={handleNoteSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Note Content
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all min-h-[150px] resize-none"
              placeholder="Write your note here..."
              value={noteContent}
              onChange={e => setNoteContent(e.target.value)}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Create Note
          </motion.button>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 text-center font-medium"
            >
              {successMsg}
            </motion.div>
          )}
        </form>
      </Modal>

      <Modal open={modal === "contact"} onClose={() => setModal(null)} title="Add New Contact">
        <form onSubmit={handleContactSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter contact name..."
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter email address..."
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Add Contact
          </motion.button>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 border rounded-xl text-center font-medium ${successMsg.includes("valid")
                ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                }`}
            >
              {successMsg}
            </motion.div>
          )}
        </form>
      </Modal>

      <Modal open={modal === "file"} onClose={() => setModal(null)} title="Upload File">
        <form onSubmit={handleFileSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center bg-gray-50 dark:bg-gray-800/50">
            <input
              type="file"
              className="hidden"
              id="fileInput"
              onChange={e => setFile(e.target.files[0])}
              required
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <HiOutlineUpload className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                  {file ? file.name : "Choose a file to upload"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Click to browse files"}
                </p>
              </div>
            </label>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!file}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload File
          </motion.button>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 text-center font-medium"
            >
              {successMsg}
            </motion.div>
          )}
        </form>
      </Modal>
    </div>
  );
}
