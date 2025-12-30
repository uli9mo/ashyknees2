import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Clock, Users, MessageSquare, Shield, Server, Gamepad2, Trophy, Send, 
  Mail, User, Eye, EyeOff, FileText, Link, CheckCircle, Image, HelpCircle, 
  Sun, Moon, Palette, ChevronDown, ArrowUpDown, Sparkles, Heart, ThumbsUp, Bomb
} from 'lucide-react';

//  sound effects uhh change it if u want lmao they're BASE 64 AND 0.2 SECONDS LONG BTW 
const SOUNDS = {
  ding: 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV......',
  click: 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAABpAAADwAABUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV...0',
  secret: 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAABpAAADwAABUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV...A',
  explosion: 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV......'
};
// ###############################
// Made by eyewatercanwaters2
// WITH lots of help from yall 
// ###############################



const useSound = () => {
  const refs = useRef({});

  useEffect(() => {
    // THIS PRELOADS ALL SOUND
    Object.keys(SOUNDS).forEach(key => {
      refs.current[key] = new Audio(SOUNDS[key]);
    });
    return () => {
      Object.values(refs.current).forEach(audio => audio?.pause());
    };
  }, []);

  const play = (name) => {
    const audio = refs.current[name];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.warn("🔇 Audio play prevented (user gesture needed):", e));
    }
  };

  return play;
};

// COMMENTS
const FAKE_COMMENTS = {
  1: [ // Corruption news
    {
      id: 101,
      author: "Jiemos",
      avatar: "https://i.natgeofe.com/k/6f2282df-1c6a-474a-9216-ed97b3dce858/Panda-Bamboo_Panda-Quiz_KIDS_1021.jpg?wp=1&w=1084.125&h=721.875",
      text: "Is this real, never knew ibiklackeur would do this...",
      time: "Dec 22, 2025 18:45",
      likes: 3
    },
    {
      id: 102,
      author: "Eyewatercanwaters2",
      avatar: "https://cdn.discordapp.com/avatars/1345578724732567564/e6192c86ac8410150345cb811d0ca429.png",
      text: "Yes I'll tell you what happened if you want.",
      time: "Dec 22, 2025 19:15",
      likes: 3
    },
    {
      id: 103,
      author: "Ibiklackeur",
      avatar: "https://pticaarchive.wordpress.com/wp-content/uploads/2012/10/naked-banana.jpg?w=620",
      text: "Guys guys, this already ended we made amends lets just forget about it..",
      time: "Dec 22, 2025 20:30",
      likes: 2
    }
  ],
  4: [ // Build contest
    {
      id: 401,
      author: "Eyewatercanwaters2",
      avatar: "https://cdn.discordapp.com/avatars/1345578724732567564/e6192c86ac8410150345cb811d0ca429.png",
      text: "Hope I win the build battle everyone give me 10 stars! in the server",
      time: "Dec 22, 2025 13:45",
      likes: 2
    },
    {
      id: 402,
      author: "Ashborn",
      avatar: "https://cdn.discordapp.com/avatars/822808474072121345/51bacd23a923b3480a785113146dda26.png?size=512",
      text: "nope mine is",
      time: "Dec 22, 2025 14:20",
      likes: 3
    }
  ],
  3: [ // New Survival World
    {
      id: 301,
      author: "Ashborn",
      avatar: "https://cdn.discordapp.com/avatars/822808474072121345/51bacd23a923b3480a785113146dda26.png?size=512",
      text: "wish it was peaceful again",
      time: "Dec 22, 2025 14:05",
      likes: 12
    }
  ],
  9: [ // Trial Chamber
    {
      id: 901,
      author: "Ibiklackeur",
      avatar: "https://pticaarchive.wordpress.com/wp-content/uploads/2012/10/naked-banana.jpg?w=620",
      text: "That trial chamber was insane! So much loot!",
      time: "Dec 22, 2025 09:45",
      likes: 15
    }
  ]
};

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [verifyingComment, setVerifyingComment] = useState({});
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'oldest'
  const [likeCounts, setLikeCounts] = useState({});
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [miniGameScore, setMiniGameScore] = useState(0);
  const [miniGamePosition, setMiniGamePosition] = useState(50);
  const [miniGameActive, setMiniGameActive] = useState(false);
  const [tntPosition, setTntPosition] = useState({ x: 85, y: 90 });
  const [tntExploded, setTntExploded] = useState(false);
  const [dragonEggPosition, setDragonEggPosition] = useState({ x: 10, y: 85 });
  const [showDragonEgg, setShowDragonEgg] = useState(false);

  // this is the theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('cdmcs-dark-mode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [colorTheme, setColorTheme] = useState(() => 
    localStorage.getItem('cdmcs-color-theme') || 'classic'
  );

  const playSound = useSound();

  
  useEffect(() => {
    localStorage.setItem('cdmcs-dark-mode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('cdmcs-color-theme', colorTheme);
  }, [colorTheme]);

 
  useEffect(() => {
    const initial = {};
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].forEach(id => initial[id] = false);
    setVisibleComments(initial);
  }, []);

  // like counts
  useEffect(() => {
    const initialLikes = {};
    Object.keys(FAKE_COMMENTS).forEach(newsId => {
      FAKE_COMMENTS[newsId].forEach(comment => {
        initialLikes[comment.id] = comment.likes;
      });
    });
    setLikeCounts(initialLikes);
  }, []);

  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // movmement
  useEffect(() => {
    if (!miniGameActive || !showMiniGame) return;

    const interval = setInterval(() => {
      setMiniGamePosition(prev => {
        const newPos = prev + (Math.random() - 0.5) * 20;
        return Math.max(0, Math.min(100, newPos));
      });
    }, 500);

    return () => clearInterval(interval);
  }, [miniGameActive, showMiniGame]);

  // dragon egg
  useEffect(() => {
    if (!showDragonEgg) return;

    const interval = setInterval(() => {
      setDragonEggPosition({
        x: Math.random() * 90,
        y: Math.random() * 90
      });
    }, 3000); // Teleport every 3 seconds

    return () => clearInterval(interval);
  }, [showDragonEgg]);

  // 
  useEffect(() => {
    const handler = e => { 
      if (e.key === 'Escape') { 
        setShowEasterEgg(false); 
        setShowMiniGame(false);
        playSound('click'); 
      } 
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [playSound]);

  // 
  const newsItems = [
    {
      id: 1,
      title: "Corruption...",
      content: "We found out Ibiklackeur gave himself maces diamond blocks, extended bans due to spite, wrongfully accused members of cheats, tried to ip log us with fake links. Due to Ibiklackeur's actions the server will be closed until he apologizes or fix what he done wrong.",
      author: "Ashborn",
      date: "Dec 22, 2025",
      time: "18:26",
      category: "exposed",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 18, 26).getTime()
    },
    {
      id: 2,
      title: "Fundraiser!💰",
      content: "We worked hard coding and building this website, please consider donating me some robux!",
      author: "Ibiklackeur",
      date: "Dec 22, 2025",
      time: "14:30",
      category: "charity",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 14, 30).getTime()
    },
    {
      id: 3,
      title: "New Survival World Launched!",
      content: "After weeks of planning our new survival world for our Classic Duels's Minecraft server, we finally launched it with an official website!",
      author: "Eyewatercanwaters2",
      date: "Dec 22, 2025",
      time: "13:30",
      category: "major-update",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 13, 30).getTime()
    },
    {
      id: 4,
      title: "Weekly Build Contest",
      content: "Would anyone wan't to participate in a weekly Build Contest? If so then make sure you send beautiful screenshots of your build in our channel on Discord.",
      author: "Ashborn",
      date: "Dec 22, 2025",
      time: "13:15",
      category: "contest",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 13, 15).getTime()
    },
    {
      id: 5,
      title: "Server Start-up Scheduled.",
      content: "We'll be adding essential mods and features to our server, be sure to wait for the announcements of the release. We plan to officially start the server on Dec 14, 10:50 AM.",
      author: "Jiemos",
      date: "Dec 22, 2025",
      time: "13:09",
      category: "maintenance",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 13, 9).getTime()
    },
    {
      id: 6,
      title: "New Plugin Recommendation: Tough As Nails.",
      content: "Adding this mod would help give a challenge to all players, including myself.",
      author: "Ibiklackeur",
      date: "Dec 22, 2025",
      time: "12:45",
      category: "feature",
      readTime: "30 sec",
      timestamp: new Date(2025, 11, 22, 12, 45).getTime()
    },
    {
      id: 7,
      title: "Holiday Event Planning",
      content: "A beautiful, nice, fun event for this Christmas. We plan to have a theme park built by then, DM Jiemos if you would wanna help!",
      author: "Jiemos",
      date: "Dec 22, 2025",
      time: "11:20",
      category: "event",
      readTime: "2 min",
      timestamp: new Date(2025, 11, 22, 11, 20).getTime()
    },
    {
      id: 8,
      title: "🚨 Bogged Incident Report",
      content: "Following multiple Bogged ambushes (see Dec 14 log, lines #384, #400–403), we've reinforced the Ancient City with torches and iron golems..",
      author: "Jiemos",
      date: "Dec 22, 2025",
      time: "10:14",
      category: "updates",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 10, 14).getTime()
    },
    {
      id: 9,
      title: "🏆 Trial Chamber Discovery!",
      content: "Kira and ibikl finally located the third Trial Chamber! they got a full set of diamond gear, a trial key, and suspiciously no Bogged. DM Jiemos for coordinates (trust).",
      author: "Ibiklackeur",
      date: "Dec 22, 2025",
      time: "09:22",
      category: "major-update",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 9, 22).getTime()
    },
    {
      id: 10,
      title: "🤫 'Who is harley leakz!",
      content: "Multiple players reported to us saying Harley Leakz has sent them random server ips, when they joined they saw a giant statue that they couldn't make out in the distance. Who is Harley Leakz??? ",
      author: "Ibiklackeur",
      date: "Dec 22, 2025",
      time: "08:07",
      category: "mystery",
      readTime: "2 min",
      timestamp: new Date(2025, 11, 22, 8, 7).getTime()
    },
    {
      id: 11,
      title: "🎄 Christmas Event Finished!",
      content: "The Christmas theme park is complete! Featuring snowball fights, present hunts, and a giant Santa statue. Event starts Dec 24 at 6 PM server time.",
      author: "Jiemos",
      date: "Dec 22, 2025",
      time: "07:45",
      category: "event",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 7, 45).getTime()
    },
    {
      id: 12,
      title: "⚡Performance Boost",
      content: "We've optimized our server performance! Reduced lag by 40% with new chunk loading. The difference is noticeable in the Nether",
      author: "Eyewatercanwaters2",
      date: "Dec 22, 2025",
      time: "06:20",
      category: "major-update",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 6, 20).getTime()
    },
    {
      id: 13,
      title: "🛡️ New Anti-Cheat System",
      content: "Implemented a new, stronger anti-cheat system. False positives reduced by 85%. Report any issues to Ashborn directly.",
      author: "Ashborn",
      date: "Dec 22, 2025",
      time: "05:30",
      category: "feature",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 5, 30).getTime()
    },
    {
      id: 14,
      title: "🏗️ Community Build Project",
      content: "Starting a mega build: A floating island city! Everyone is welcome to contribute. First planning meeting this Saturday in Discord VC.",
      author: "Kira",
      date: "Dec 22, 2025",
      time: "04:15",
      category: "community",
      readTime: "1 min",
      timestamp: new Date(2025, 11, 22, 4, 15).getTime()
    },
    {
      id: 15,
      title: "📊 Server Statistics Released",
      content: "Stats: 12 active players, 482 hours total playtime, 127,000 blocks placed. Most mined block: stone. Most deaths: falling (32%).",
      author: "Ibiklackeur",
      date: "Dec 22, 2025",
      time: "03:00",
      category: "updates",
      readTime: "2 min",
      timestamp: new Date(2025, 11, 22, 3, 0).getTime()
    }
  ];

  // S
  const sortedNewsItems = [...newsItems].sort((a, b) => {
    if (sortOrder === 'latest') {
      return b.timestamp - a.timestamp; // Ne
    } else {
      return a.timestamp - b.timestamp; // Oldes
    }
  });

  // Serve
  const serverStats = {
    playersOnline: 0,
    totalPlayers: 12,
    uptime: "0",
    version: "1.21.10 FABRIC",
    worldSize: "4.82 GB"
  };

  //  all with Steve icon if no avatar
  const activePlayers = [
    { name: "Kira", status: "Offline", time: "2 hour", avatar: "https://cdn.discordapp.com/avatars/1271440596195737693/2dc56e1377af394802df23561eff2e13.png" },
    { name: "Asparagus21345", status: "Offline", time: "8 hour", avatar: "" },
    { name: "Ibikl", status: "Offline", time: "4 hour", avatar: "https://pticaarchive.wordpress.com/wp-content/uploads/2012/10/naked-banana.jpg?w=620" },
    { name: "Senkaium", status: "Offline", time: "2 hours", avatar: "" },
    { name: "Dristach391", status: "Offline", time: "1 hour", avatar: "https://cdn.discordapp.com/avatars/1238944179837734947/92283dd7964213b9ea0ae19679a83c60.png" },
    { name: "Steve", status: "Offline", time: "5 hour", avatar: "" },
    { name: "Alex", status: "Offline", time: "3 hour", avatar: "" },
    { name: "Herobrine", status: "Offline", time: "12 hour", avatar: "" }
  ];

  const getAuthorAvatar = (authorName) => {
    const name = authorName.toLowerCase();
    switch (name) {
      case 'ibiklackeur':
      case 'ibikl':
        return 'https://pticaarchive.wordpress.com/wp-content/uploads/2012/10/naked-banana.jpg?w=620';
        // da banana man aka FUCKING BTICHASS IBIK
      case 'eyewatercanwaters2':
        return 'https://cdn.discordapp.com/avatars/1345578724732567564/e6192c86ac8410150345cb811d0ca429.png';
        // me! lovely me
      case 'kira':
        return 'https://cdn.discordapp.com/avatars/1271440596195737693/2dc56e1377af394802df23561eff2e13.png';
        // its kira!!!!
      case 'ashborn':
        return 'https://cdn.discordapp.com/avatars/822808474072121345/51bacd23a923b3480a785113146dda26.png?size=512';
        // shes rude
      case 'jiemos':
        return 'https://i.natgeofe.com/k/6f2282df-1c6a-474a-9216-ed97b3dce858/Panda-Bamboo_Panda-Quiz_KIDS_1021.jpg?wp=1&w=1084.125&h=721.875';
        // this aint me
      case 'dristach391':
        return 'https://cdn.discordapp.com/avatars/1238944179837734947/92283dd7964213b9ea0ae19679a83c60.png';
        // FUCKING BITCHASS
      default:
        // steve if they got no icon lmfao
        return 'data:image/jpeg;base64,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';
    }
  };

  // dark categories
  const getCategoryColor = (category) => {
    switch (category) {
      case 'major-update': return 'bg-purple-700'; // Darker purple
      case 'contest': return 'bg-yellow-600'; // Darker yellow
      case 'maintenance': return 'bg-blue-700'; // Darker blue
      case 'feature': return 'bg-green-700'; // Darker green
      case 'event': return 'bg-pink-700'; // Darker pink
      case 'charity': return 'bg-amber-700'; // Darker amber
      case 'exposed': return 'bg-red-700'; // Darker red
      case 'mystery': return 'bg-indigo-700'; // Darker indigo
      case 'updates': return 'bg-orange-700'; // Darker orange
      case 'community': return 'bg-teal-700'; // Darker teal
      default: return 'bg-gray-700'; // Darker gray
    }
  };

  // uhhh i forgot 
  const themeClasses = {
    bg: darkMode 
      ? colorTheme === 'bogged' ? 'bg-gradient-to-br from-red-950 via-amber-950 to-red-900 text-amber-100' 
        : colorTheme === 'trial' ? 'bg-gradient-to-br from-purple-950 via-cyan-950 to-purple-900 text-cyan-100' 
        : colorTheme === 'purple' ? 'bg-gradient-to-br from-purple-900 via-violet-900 to-purple-800 text-purple-100'
        : colorTheme === 'green' ? 'bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-800 text-emerald-100'
        : colorTheme === 'pink' ? 'bg-gradient-to-br from-pink-900 via-rose-900 to-pink-800 text-pink-100'
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
      : colorTheme === 'bogged' ? 'bg-gradient-to-br from-amber-50 via-red-50 to-amber-100 text-red-900' 
        : colorTheme === 'trial' ? 'bg-gradient-to-br from-cyan-50 via-purple-50 to-cyan-100 text-purple-900' 
        : colorTheme === 'purple' ? 'bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 text-purple-900'
        : colorTheme === 'green' ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 text-emerald-900'
        : colorTheme === 'pink' ? 'bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 text-pink-900'
        : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-900',
    
    primary: colorTheme === 'bogged' 
      ? (darkMode ? 'text-amber-400' : 'text-red-600')
      : colorTheme === 'trial' 
        ? (darkMode ? 'text-cyan-400' : 'text-purple-600')
        : colorTheme === 'purple'
          ? (darkMode ? 'text-purple-400' : 'text-purple-600')
        : colorTheme === 'green'
          ? (darkMode ? 'text-emerald-400' : 'text-emerald-600')
        : colorTheme === 'pink'
          ? (darkMode ? 'text-pink-400' : 'text-pink-600')
        : (darkMode ? 'text-blue-400' : 'text-blue-600'),

    buttonGrad: colorTheme === 'bogged'
      ? (darkMode 
          ? 'from-amber-500 via-orange-500 to-red-600 hover:from-amber-600 hover:via-orange-600 hover:to-red-700'
          : 'from-amber-400 via-orange-400 to-red-500 hover:from-amber-500 hover:via-orange-500 hover:to-red-600')
      : colorTheme === 'trial'
        ? (darkMode 
            ? 'from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700'
            : 'from-cyan-400 via-blue-400 to-purple-500 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-600')
        : colorTheme === 'purple'
          ? (darkMode 
              ? 'from-purple-500 via-violet-500 to-purple-600 hover:from-purple-600 hover:via-violet-600 hover:to-purple-700'
              : 'from-purple-400 via-violet-400 to-purple-500 hover:from-purple-500 hover:via-violet-500 hover:to-purple-600')
        : colorTheme === 'green'
          ? (darkMode 
              ? 'from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700'
              : 'from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-500 hover:via-teal-500 hover:to-emerald-600')
        : colorTheme === 'pink'
          ? (darkMode 
              ? 'from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700'
              : 'from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:via-rose-500 hover:to-pink-600')
        : (darkMode 
            ? 'from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700'
            : 'from-blue-400 via-indigo-400 to-purple-500 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-600'),

    cardBg: darkMode 
      ? colorTheme === 'purple' ? 'bg-purple-900/30 backdrop-blur-sm border border-purple-700/50'
        : colorTheme === 'green' ? 'bg-emerald-900/30 backdrop-blur-sm border border-emerald-700/50'
        : colorTheme === 'pink' ? 'bg-pink-900/30 backdrop-blur-sm border border-pink-700/50'
        : 'bg-gray-800/30 backdrop-blur-sm border border-gray-700/50'
      : colorTheme === 'purple' ? 'bg-purple-50 border border-purple-200'
        : colorTheme === 'green' ? 'bg-emerald-50 border border-emerald-200'
        : colorTheme === 'pink' ? 'bg-pink-50 border border-pink-200'
        : 'bg-white border border-gray-200',
    
    input: darkMode 
      ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm'
      : 'bg-white/80 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (userEmail && userName) {
      setIsAuthenticated(true);
      playSound('ding');
    }
  };

  const handleCommentSubmit = (e, newsId) => {
    e.preventDefault();
    playSound('ding');
    setVerifyingComment(prev => ({ ...prev, [newsId]: true }));
    setTimeout(() => {
      setVerifyingComment(prev => ({ ...prev, [newsId]: false }));
      const commentInput = document.getElementById(`comment-input-${newsId}`);
      if (commentInput) commentInput.value = '';
    }, 2000);
  };

  const toggleComments = (newsId) => {
    playSound('click');
    setVisibleComments(prev => ({
      ...prev,
      [newsId]: !prev[newsId]
    }));
  };

  const toggleTheme = () => {
    playSound('click');
    setDarkMode(!darkMode);
  };

  const cycleColorTheme = () => {
    playSound('click');
    const themes = ['classic', 'purple', 'green', 'pink', 'bogged', 'trial'];
    const idx = themes.indexOf(colorTheme);
    setColorTheme(themes[(idx + 1) % themes.length]);
  };

  const copyServerAddress = () => {
    navigator.clipboard.writeText('cdmcs-official.aternos.me:25565');
    playSound('ding');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSortOrder = () => {
    playSound('click');
    setSortOrder(sortOrder === 'latest' ? 'oldest' : 'latest');
  };

  const handleLike = (commentId) => {
    playSound('click');
    setLikeCounts(prev => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 1
    }));
  };

  const startMiniGame = () => {
    playSound('secret');
    setShowMiniGame(true);
    setMiniGameScore(0);
    setMiniGameActive(true);
    setTimeout(() => {
      setMiniGameActive(false);
    }, 10000); // 10 secs
  };

  const catchMiniGame = () => {
    if (miniGameActive) {
      playSound('ding');
      setMiniGameScore(prev => prev + 1);
      setMiniGamePosition(Math.random() * 100);
    }
  };

  const handleTntClick = () => {
    if (!tntExploded) {
      playSound('explosion');
      setTntExploded(true);
      setTimeout(() => {
        setTntExploded(false);
        // move da tnt to a random position
        setTntPosition({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10
        });
      }, 1500);
    }
  };

  const handleDragonEggClick = () => {
    playSound('ding');
    setShowDragonEgg(!showDragonEgg);
    if (!showDragonEgg) {
      // set
      setDragonEggPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      });
    }
  };

  const handleMoveTnt = (e) => {
    if (e.type === 'mousedown' || e.type === 'touchstart') {
      e.preventDefault();
      const startX = e.clientX || e.touches[0].clientX;
      const startY = e.clientY || e.touches[0].clientY;
      const startTntX = tntPosition.x;
      const startTntY = tntPosition.y;

      const handleMove = (moveEvent) => {
        const currentX = moveEvent.clientX || moveEvent.touches[0].clientX;
        const currentY = moveEvent.clientY || moveEvent.touches[0].clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        setTntPosition({
          x: Math.max(0, Math.min(95, startTntX + deltaX / 10)),
          y: Math.max(0, Math.min(95, startTntY + deltaY / 10))
        });
      };

      const handleUp = () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleUp);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleUp);
    }
  };

  const headerGradient = () => {
    switch(colorTheme) {
      case 'purple': return 'bg-gradient-to-r from-purple-800 via-violet-700 to-purple-900';
      case 'green': return 'bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900';
      case 'pink': return 'bg-gradient-to-r from-pink-800 via-rose-700 to-pink-900';
      case 'bogged': return 'bg-gradient-to-r from-red-800 via-amber-700 to-red-900';
      case 'trial': return 'bg-gradient-to-r from-purple-800 via-cyan-700 to-purple-900';
      default: return 'bg-gradient-to-r from-green-800 via-emerald-700 to-green-900';
    }
  };

  // Steve iron url
  const STEVE_ICON = 'data:image/jpeg;base64,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';

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses.bg}`}>
      {/* Theme Controls (Top Right) */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
            darkMode 
              ? 'bg-amber-400 text-gray-900 hover:bg-amber-300' 
              : 'bg-gray-800 text-amber-200 hover:bg-gray-700'
          }`}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle light/dark mode"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          onClick={cycleColorTheme}
          className={`p-2.5 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600' 
              : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500'
          }`}
          title="Cycle color theme"
          aria-label="Cycle color theme"
        >
          <Palette className="h-5 w-5" />
        </button>
      </div>

      {/* Header */}
      <header className={`relative overflow-hidden ${headerGradient()} shadow-xl`}>
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-full shadow-lg ring-1 ring-white/30 hover:ring-2 hover:ring-emerald-400/50 transition-all duration-500 hover:scale-105">
                <Gamepad2 className="h-16 w-16 text-white drop-shadow-lg" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
              CDMCS <span className="text-emerald-300">NEWS!</span>
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Your daily important update on what's happening in our Minecraft Server...😄
            </p>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className={`border-b ${
        darkMode ? 'bg-gray-800/60 backdrop-blur-sm border-gray-700/70' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
            {[
              { icon: <Users className="h-5 w-5" />, label: `${serverStats.playersOnline}/${serverStats.totalPlayers} online`, color: themeClasses.primary },
              { icon: <Server className="h-5 w-5" />, label: `v${serverStats.version}`, color: darkMode ? 'text-green-400' : 'text-green-600' },
              { icon: <Clock className="h-5 w-5" />, label: serverStats.uptime, color: darkMode ? 'text-purple-400' : 'text-purple-600' },
              { icon: <Shield className="h-5 w-5" />, label: "Whitelist Active", color: darkMode ? 'text-yellow-400' : 'text-yellow-600' },
              { icon: <Calendar className="h-5 w-5" />, label: currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }), color: darkMode ? 'text-pink-400' : 'text-pink-600' },
            ].map((stat, i) => (
              <div 
                key={i}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                  darkMode ? 'hover:bg-gray-700/60' : 'hover:bg-gray-200'
                }`}
                onMouseEnter={() => playSound('click')}
              >
                <span className={stat.color}>{stat.icon}</span>
                <span className={darkMode ? 'text-gray-200 font-medium' : 'text-gray-800 font-medium'}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-3xl font-extrabold ${
                darkMode ? 'text-white' : 'text-gray-900'
              } flex items-center`}>
                <span className="relative">
                  Latest News
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"></span>
                </span>
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSortOrder}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-300 font-semibold ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort: {sortOrder === 'latest' ? 'Latest First' : 'Oldest First'}</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  darkMode ? 'bg-blue-600 text-blue-100' : 'bg-blue-500 text-white'
                }`}>
                  {sortedNewsItems.length} updates
                </span>
              </div>
            </div>

            {sortedNewsItems.map((news, idx) => (
              <article 
                key={news.id} 
                className={`rounded-xl border overflow-hidden 
                  transition-all duration-500 
                  hover:shadow-2xl hover:-translate-y-1
                  group animate-fade-in-stagger ${themeClasses.cardBg}`}
                style={{ animationDelay: `${idx * 100}ms` }}
                onMouseEnter={() => playSound('click')}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white ${getCategoryColor(news.category)} shadow-md`}>
                        {news.category.replace('-', ' ').toUpperCase()}
                      </span>
                      {sortOrder === 'latest' && idx === 0 && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white animate-pulse">
                          🚨 LATEST
                        </span>
                      )}
                    </div>
                    <div className={`flex items-center space-x-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {news.date}
                      </span>
                      <span>
                        <Clock className="h-3 w-3 inline mr-1" />
                        {news.readTime}
                      </span>
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  } group-hover:text-blue-500 transition-colors`}>
                    {news.title}
                  </h3>
                  <p className={`mb-5 leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {news.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-500/30 group-hover:ring-blue-400/50 transition-shadow">
                        <img 
                          src={getAuthorAvatar(news.author)} 
                          alt={news.author} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = STEVE_ICON;
                          }}
                        />
                      </div>
                      <span className={`font-semibold ${
                        darkMode ? 'text-blue-300' : 'text-blue-600'
                      } group-hover:text-blue-500 transition-colors`}>
                        {news.author}
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleComments(news.id)}
                      className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
                        darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                      }`}
                    >
                      {visibleComments[news.id] ? <EyeOff className="h-4 w-4 animate-pulse" /> : <Eye className="h-4 w-4" />}
                      <span>{visibleComments[news.id] ? 'Hide' : 'Show'} Discussion</span>
                    </button>
                  </div>
                </div>

                {/* Discussion Section */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    visibleComments[news.id] 
                      ? 'max-h-[1000px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`border-t ${
                    darkMode ? 'bg-gray-900/40 border-gray-700/70' : 'bg-gray-50 border-gray-200'
                  } p-6`}>
                    <h4 className={`text-lg font-bold mb-4 flex items-center ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <MessageSquare className={`h-5 w-5 mr-2 ${themeClasses.primary} animate-bounce-slow`} />
                      Discussion
                    </h4>
                    
                    {/* Sist */}
                    {FAKE_COMMENTS[news.id] && (
                      <div className="space-y-4 mb-6">
                        {FAKE_COMMENTS[news.id].map(comment => (
                          <div key={comment.id} className={`p-4 rounded-xl ${
                            darkMode ? 'bg-gray-800/40' : 'bg-gray-100'
                          }`}>
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                  <img 
                                    src={comment.avatar} 
                                    alt={comment.author} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = STEVE_ICON;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className={`font-semibold ${
                                      darkMode ? 'text-blue-300' : 'text-blue-600'
                                    }`}>{comment.author}</span>
                                    <span className={`text-xs ml-2 ${
                                      darkMode ? 'text-gray-500' : 'text-gray-500'
                                    }`}>{comment.time}</span>
                                  </div>
                                  <button 
                                    onClick={() => handleLike(comment.id)}
                                    className={`flex items-center space-x-1 ${
                                      darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                                    }`}
                                  >
                                    <Heart className={`h-4 w-4 ${likeCounts[comment.id] > comment.likes ? 'fill-red-500 text-red-500' : ''}`} />
                                    <span className="text-xs">{likeCounts[comment.id] || comment.likes}</span>
                                  </button>
                                </div>
                                <p className={`mt-2 ${
                                  darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>{comment.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={`bg-blue-900/40 border border-blue-700/70 rounded-xl p-4 mb-6 ${
                      darkMode ? '' : 'bg-blue-50'
                    }`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <MessageSquare className={`h-5 w-5 ${themeClasses.primary}`} />
                        </div>
                        <div className="ml-3">
                          <p className={`text-blue-200 text-sm ${
                            darkMode ? '' : 'text-blue-800'
                          }`}>
                            <span className="font-semibold">Comment Policy:</span> All comments are manually reviewed by admins for server security.
                          </p>
                          <p className={`text-blue-300 text-xs mt-1 ${
                            darkMode ? '' : 'text-blue-600'
                          }`}>
                            ⏱️ Verification typically takes 1–2 minutes. Approved comments will appear.
                          </p>
                        </div>
                      </div>
                    </div>

                    {!isAuthenticated ? (
                      <div className={`rounded-xl p-5 border ${
                        darkMode ? 'bg-gray-800/70 border-gray-700/50' : 'bg-gray-100 border-gray-300'
                      }`}>
                        <h5 className={`font-semibold mb-4 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>Join the discussion</h5>
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                              <User className="h-5 w-5" />
                            </div>
                            <input
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Your Minecraft name"
                              className={`block w-full pl-11 pr-4 py-3 rounded-xl transition-all duration-300 ${
                                themeClasses.input
                              }`}
                              required
                            />
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                              <Mail className="h-5 w-5" />
                            </div>
                            <input
                              type="email"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              placeholder="your@email.com"
                              className={`block w-full pl-11 pr-4 py-3 rounded-xl transition-all duration-300 ${
                                themeClasses.input
                              }`}
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className={`w-full font-bold py-3 px-4 rounded-xl transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-lg bg-gradient-to-r ${themeClasses.buttonGrad} text-white relative overflow-hidden group`}
                          >
                            <span className="relative z-10 flex items-center justify-center space-x-2">
                              <Shield className="h-4 w-4" />
                              <span>Sign In to Comment</span>
                            </span>
                          </button>
                        </form>
                      </div>
                    ) : (
                      <form 
                        onSubmit={(e) => handleCommentSubmit(e, news.id)} 
                        className="space-y-4"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-green-500/30">
                              <img 
                                src={getAuthorAvatar(userName)} 
                                alt={userName} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = STEVE_ICON;
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <textarea
                              id={`comment-input-${news.id}`}
                              rows="2"
                              placeholder={`Share your thoughts on "${news.title}"...`}
                              className={`block w-full px-4 py-3 rounded-xl resize-none ${
                                themeClasses.input
                              }`}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Signed in as <span className="text-green-500 font-medium">{userName}</span>
                          </span>
                          <button
                            type="submit"
                            disabled={verifyingComment[news.id]}
                            className={`${
                              verifyingComment[news.id] 
                                ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') 
                                : `bg-gradient-to-r ${themeClasses.buttonGrad}`
                            } text-white font-bold py-2.5 px-5 rounded-lg transition-all duration-300 flex items-center space-x-2`}
                          >
                            {verifyingComment[news.id] ? (
                              <>
                                <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" 
                                  style={{ borderColor: `${darkMode ? '#93c5fd' : '#60a5fa'} transparent` }}></div>
                                <span>Verifying...</span>
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                <span>Submit Comment</span>
                              </>
                            )}
                          </button>
                        </div>
                        {verifyingComment[news.id] && (
                          <div className={`mt-4 p-4 rounded-xl animate-pulse ${
                            darkMode ? 'bg-amber-900/30 border border-amber-700/70' : 'bg-amber-100 border border-amber-300'
                          }`}>
                            <div className="flex items-center text-amber-500">
                              <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                              <span className="font-semibold">Verifying comment...</span>
                            </div>
                            <p className={`text-amber-600 text-xs mt-1 ml-6 ${
                              darkMode ? 'text-amber-400' : ''
                            }`}>
                              Please wait — all comments are manually reviewed for anti-cheat compliance
                            </p>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Server Logs */}
            <div className={`rounded-xl overflow-hidden ${
              themeClasses.cardBg
            } transition-all duration-500 hover:shadow-xl`}>
              <div className="p-6">
                <h3 className={`text-xl font-bold flex items-center ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <FileText className={`h-5 w-5 mr-2 ${
                    darkMode ? 'text-amber-400' : 'text-amber-600'
                  }`} />
                  Server Logs
                </h3>
                <p className={`text-sm mt-2 mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Daily server logs😄 (In the links below)
                </p>
                <div className={`rounded-xl p-4 min-h-[200px] ${
                  darkMode ? 'bg-gray-900/60' : 'bg-gray-50'
                }`}>
                  <div className={`font-mono text-sm space-y-3 ${
                    darkMode ? 'text-amber-300' : 'text-amber-700'
                  }`}>
                    {[
                      { date: "Dec 19, 2025", url: "https://mclo.gs/P3bdC7j" },
                      { date: "Dec 18, 2025", url: "https://mclo.gs/7OJvEiK" },
                      { date: "Dec 15, 2025", url: "https://mclo.gs/wpL50I4" },
                      { date: "Dec 14, 2025", url: "https://mclo.gs/zQjJY4i" },
                      { date: "Dec 13, 2025", url: "https://example.com/logs/dec13" }
                    ].map((log, i) => (
                      <div 
                        key={i} 
                        className="flex items-start group cursor-pointer"
                        onClick={() => {
                          playSound('click');
                          window.open(log.url, '_blank');
                        }}
                      >
                        <Link className={`h-4 w-4 mt-1 mr-2 flex-shrink-0 ${
                          darkMode ? 'text-amber-400 group-hover:text-amber-300' : 'text-amber-600 group-hover:text-amber-500'
                        } transition-colors`} />
                        <span className={`group-hover:underline ${
                          darkMode ? 'text-blue-300 group-hover:text-blue-200' : 'text-blue-600 group-hover:text-blue-500'
                        } transition-colors`}>
                          {log.date} Server Log
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-4 pt-3 border-t ${
                    darkMode ? 'border-gray-700/50 text-gray-500' : 'border-gray-300 text-gray-500'
                  } text-xs`}>
                    Logs updated after each server session
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className={`rounded-xl overflow-hidden ${
              themeClasses.cardBg
            } transition-all duration-500 hover:shadow-xl`}>
              <div className="p-6">
                <h3 className={`text-xl font-bold flex items-center ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <HelpCircle className={`h-5 w-5 mr-2 ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  FAQ
                </h3>
                <div className="space-y-4 mt-4">
                  {[
                    { q: "Do Jiemos and Ibiklackeur cheat?", a: "No, we don't. We post server logs daily for full transparency, and all admin actions are logged and visible to the community.", by: "- Jiemos & Ibiklackeur" },
                    { q: "Do you log IP addresses of website visitors?", a: "No, we don't. This website has no backend server to track or store visitor data such as IP addresses, cookies, or personal information. We respect your privacy.", by: "- Eyewatercanwaters2" },
                    { q: "Does it cost to join the server?", a: "No, it's completely free. The server is funded by Ibiklackeur, and we welcome all friends (and friends of friends) to join our community!", by: "- Ibiklackeur" },
                    { q: "How can I get admin/moderator access?", a: "I don't give out admin roles. If you're helpful, respectful, and contribute positively to the community for a long time, I may consider you for a special role — but never for power or influence.", by: "- Eyewatercanwaters2 & Ibiklackeur" },
                    { q: "Who are the server owners?", a: "For Discord, Ibiklackeur owns the server. For the Minecraft server, it's Jiemos, Ibiklackeur & Ashborn.", by: "- Ibiklackeur, Eyewatercanwaters2" }
                  ].map((faq, i) => (
                    <div 
                      key={i}
                      className={`p-4 rounded-xl transition-colors cursor-pointer ${
                        darkMode 
                          ? 'bg-gray-700/40 hover:bg-gray-700/60' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => playSound('click')}
                    >
                      <h4 className={`font-bold mb-2 ${
                        darkMode ? 'text-blue-300' : 'text-blue-600'
                      }`}>❓ {faq.q}</h4>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <span className="text-green-500 font-medium">✓</span> {faq.a}
                        <br/><br/>
                        <span className={`text-xs ${
                          darkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>{faq.by}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* gallery */}
            <div className={`rounded-xl overflow-hidden ${
              themeClasses.cardBg
            } transition-all duration-500 hover:shadow-xl`}>
              <div className="p-6">
                <h3 className={`text-xl font-bold flex items-center ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Image className={`h-5 w-5 mr-2 ${
                    darkMode ? 'text-pink-400' : 'text-pink-600'
                  }`} />
                  Gallery
                </h3>
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>Our Minecraft moments 😄</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { color: "4ade80", text: "Build" },
                    { color: "8b5cf6", text: "Adventure" },
                    { color: "0ea5e9", text: "Redstone" },
                    { color: "f59e0b", text: "Fun" }
                  ].map((img, i) => (
                    <div 
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden border border-gray-600/70 
                        hover:scale-[1.03] hover:rotate-1 transition-all duration-500 cursor-pointer"
                      onClick={() => playSound('click')}
                    >
                      <img 
                        src={`https://placehold.co/300x300/${img.color}/000000?text=${img.text}`} 
                        alt={img.text} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
                <div className={`mt-4 pt-3 border-t ${
                  darkMode ? 'border-gray-700/50' : 'border-gray-300'
                } text-center`}>
                  <button 
                    className={`font-medium flex items-center justify-center mx-auto group ${
                      darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                    }`}
                    onClick={() => playSound('click')}
                  >
                    Check Discord for the gallery contest
                    <span className="ml-1 inline-block group-hover:translate-x-1 transition-transform">⭐</span>
                  </button>
                </div>
              </div>
            </div>

            {/* active payers  */}
            <div className={`rounded-xl p-6 ${
              themeClasses.cardBg
            } transition-all duration-500 hover:shadow-xl`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold flex items-center ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Users className={`h-5 w-5 mr-2 ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  Active Players
                </h3>
                <span className={`font-bold px-3 py-1 rounded-full ${
                  darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-200 text-blue-700'
                }`}>5</span>
              </div>
              <div className="space-y-3">
                {activePlayers.filter(p => p.name).map((player, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 cursor-pointer ${
                      darkMode ? 'bg-gray-700/40 hover:bg-gray-700/60' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => playSound('click')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-500/20 group-hover:ring-blue-400/40 transition-shadow">
                        <img 
                          src={player.avatar || STEVE_ICON} 
                          alt={player.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          onError={(e) => {
                            e.target.src = STEVE_ICON;
                          }}
                        />
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${
                          darkMode ? 'text-white group-hover:text-blue-200' : 'text-gray-900 group-hover:text-blue-600'
                        }`}>{player.name}</p>
                        <p className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>{player.status}</p>
                      </div>
                    </div>
                    <span className={`text-xs ${
                      darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-400'
                    }`}>{player.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Server Info */}
            <div className={`rounded-xl p-6 ${
              themeClasses.cardBg
            } transition-all duration-500 hover:shadow-xl`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Server className={`h-5 w-5 mr-2 ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`} />
                Server Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>IP + Port</span>
                  <span className={`font-mono break-all ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>cdmcs-official.aternos.me:25565</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Version</span>
                  <span className={darkMode ? 'text-green-400' : 'text-green-600'}>1.21.10 Fabric</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>World Size</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>{serverStats.worldSize}</span>
                </div>
              </div>
              <button
                onClick={copyServerAddress}
                className={`w-full mt-4 font-bold py-3 px-4 rounded-xl transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-lg bg-gradient-to-r ${themeClasses.buttonGrad} text-white relative overflow-hidden`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>{copied ? '✓ Copied!' : 'Copy server address!'}</span>
                </span>
                {copied && (
                  <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-300 animate-ping" />
                )}
              </button>
            </div>

            {/* Recent Achievements */}
            <div className={`rounded-xl p-6 ${
              themeClasses.cardBg
            } transition-all duration-500 hover:shadow-xl`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Trophy className={`h-5 w-5 mr-2 ${
                  darkMode ? 'text-yellow-400 animate-spin-slow' : 'text-yellow-600 animate-spin-slow'
                }`} />
                Recent Achievements
              </h3>
              <div className="space-y-4">
                {[
                  { title: "First to find a Trial Chamber!😄", who: "Kira", cls: "yellow", emoji: "🏆" },
                  { title: "First to make a farm!😄", who: "Asparagus21345", cls: "green", emoji: "🌱" },
                  { title: "First to survive Bogged x4! 😅", who: "Ibikl", cls: "purple", emoji: "🛡️" }
                ].map((ach, i) => (
                  <div 
                    key={i}
                    className={`p-4 rounded-xl border-l-4 ${
                      darkMode 
                        ? `bg-${ach.cls}-900/30 border-${ach.cls}-600 hover:bg-${ach.cls}-800/40` 
                        : `bg-${ach.cls}-100 border-${ach.cls}-500 hover:bg-${ach.cls}-200`
                    } transition-colors cursor-pointer`}
                    onClick={() => playSound('click')}
                  >
                    <p className={`font-bold ${
                      darkMode ? `text-${ach.cls}-200` : `text-${ach.cls}-700`
                    }`}>{ach.emoji} {ach.title}</p>
                    <p className={`text-sm ${
                      darkMode ? `text-${ach.cls}-300` : `text-${ach.cls}-600`
                    }`}>{ach.who}</p>
                    <p className={`text-xs mt-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Legendary!</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t mt-12 ${
        darkMode ? 'bg-gray-900/90 border-gray-800/70' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4 animate-bounce-slow">
              <Gamepad2 className={`h-8 w-8 drop-shadow-lg ${
                darkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
            </div>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Made with ❤️ by your friend group for the Classic Duels Minecraft Server
            </p>
            <p className={`text-sm mt-1 ${
              darkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Thanks to Jelly, and Ashborn for building this website.
            </p>
            <p className={`text-sm mt-2 italic ${
              darkMode ? 'text-gray-600' : 'text-gray-500'
            }`}>
              "Where friendships are built block by block"
            </p>
          </div>
        </div>
      </footer>

      {/* easter egg button */}
      <button
        onClick={() => {
          setShowEasterEgg(true);
          playSound('secret');
        }}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-purple-400 shadow-2xl border transition-all duration-500 hover:scale-110 hover:rotate-6 animate-float z-50 ${
          darkMode 
            ? 'bg-gray-800/80 border-purple-500/40 hover:bg-gray-700/90 hover:text-purple-300' 
            : 'bg-gray-200 border-purple-300 hover:bg-gray-300 hover:text-purple-700'
        }`}
        title="Shhh... secret intel"
        aria-label="Open secret intel"
      >
        🤫
      </button>

      {/* movable TNT Block */}
      <div 
        className={`fixed ${tntExploded ? 'z-60' : 'z-40'} cursor-grab active:cursor-grabbing transition-all duration-300 ${tntExploded ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ 
          left: `${tntPosition.x}vw`, 
          top: `${tntPosition.y}vh`,
          pointerEvents: tntExploded ? 'none' : 'auto'
        }}
        onMouseDown={handleMoveTnt}
        onTouchStart={handleMoveTnt}
        onClick={handleTntClick}
      >
        <div className="relative group">
          <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded-lg shadow-2xl transition-all duration-300 ${
            darkMode 
              ? 'bg-gradient-to-br from-red-700 to-red-900 border border-red-600 group-hover:from-red-600 group-hover:to-red-800' 
              : 'bg-gradient-to-br from-red-500 to-red-700 border border-red-400 group-hover:from-red-400 group-hover:to-red-600'
          } ${tntExploded ? 'animate-ping' : 'group-hover:scale-110 group-hover:rotate-12'}`}>
            💣
          </div>
          {!tntExploded && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Drag me! (Click to explode)
            </div>
          )}
          {tntExploded && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce">
              💥
            </div>
          )}
        </div>
      </div>

      {/* Dragon Egg */}
      <div 
        className={`fixed z-40 cursor-pointer transition-all duration-1000 ${showDragonEgg ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ 
          left: `${dragonEggPosition.x}vw`, 
          top: `${dragonEggPosition.y}vh` 
        }}
        onClick={handleDragonEggClick}
      >
        <div className="relative group">
          <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded-full shadow-2xl transition-all duration-500 ${
            darkMode 
              ? 'bg-gradient-to-br from-purple-700 to-black border border-purple-500 group-hover:from-purple-600 group-hover:to-gray-900' 
              : 'bg-gradient-to-br from-purple-500 to-gray-800 border border-purple-300 group-hover:from-purple-400 group-hover:to-gray-700'
          } ${showDragonEgg ? 'animate-pulse-slow group-hover:scale-110' : ''}`}>
            🥚
          </div>
          {showDragonEgg && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Dragon Egg (Teleports!)
            </div>
          )}
        </div>
      </div>

      {/* Easter Egg  */}
      {showEasterEgg && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg ${
            darkMode ? 'bg-black/95' : 'bg-white/95'
          }`}
          onClick={() => setShowEasterEgg(false)}
        >
          <div 
            className={`rounded-2xl max-w-md w-full p-6 text-center relative overflow-hidden ${
              darkMode ? 'bg-gray-900/95 border border-purple-500/50' : 'bg-white border border-purple-300'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 animate-pulse-slow"></div>
            <button 
              onClick={() => {
                setShowEasterEgg(false);
                playSound('click');
              }}
              className={`absolute top-3 right-3 text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode ? 'text-gray-400 hover:bg-gray-800/70' : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              ×
            </button>
            <div className="mb-5">
              <img 
                src="https://media.discordapp.net/attachments/1426762383514402949/1449881569446727802/image.png?ex=6941d46f&is=694082ef&hm=bfd136abdc8c47ad55435715b5025811f742aa16583020a347ed0c4bf8ef6ce1&=&format=webp&quality=lossless&width=550&height=277" 
                alt="Bogged Attack" 
                className="mx-auto rounded-xl border border-purple-500/40 shadow-2xl max-w-full"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                darkMode ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'
              }`}>
                🤫 CLASSIFIED SERVER INTEL
              </span>
            </h3>
            <div className="space-y-4 mb-5">
              {[
                { text: `"boi what"`, author: "- ibikl, line #269", border: "border-purple-500" },
                { text: `"holy send it"`, author: "- asparagus21345, line #271", border: "border-amber-500" },
                { text: `"NIGGER LATER"`, author: "- ibikl, line #273 (pre-Bogged)", border: "border-red-500" }
              ].map((quote, i) => (
                <div 
                  key={i}
                  className={`p-4 rounded-xl border-l-4 ${quote.border} ${
                    darkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                  }`}
                >
                  <p className={`italic ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <span className={darkMode ? 'text-purple-300 font-bold' : 'text-purple-700 font-bold'}>{quote.text}</span><br/>
                    <span className={`text-xs ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>{quote.author}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className={`rounded-xl p-4 text-sm ${
              darkMode ? 'bg-black/40' : 'bg-gray-100'
            }`}>
              <p className={`font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-800'
              }`}>
                📊 <span className={darkMode ? 'text-red-400' : 'text-red-600'}>Ibik's Bogged Incident:</span>
              </p>
              <ul className={`text-xs space-y-1 mt-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <li>• Shot by Bogged: <span className={darkMode ? 'text-red-400' : 'text-red-600'}>lines #384, #400, #401, #402</span></li>
                <li>• Final Bogged hit → <span className={darkMode ? 'text-red-400' : 'text-red-600'}>"WTF"</span> (line #403)</li>
                <li>• Also drowned (line #463)</li>
              </ul>
            </div>
            <div className={`mt-5 pt-4 border-t ${
              darkMode ? 'border-gray-800/70' : 'border-gray-300'
            }`}>
              <p className={`text-xs ${
                darkMode ? 'text-gray-500 animate-pulse' : 'text-gray-500 animate-pulse'
              }`}>
                🔒 This intel self-destructs in 5...4...3...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

//  Inject no css needed bc we got that)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-in-up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fade-in-stagger { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slide-up { from { opacity:0; transform:translateY(40px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
    @keyframes fade-in { from { opacity:0; } to { opacity:1; } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    @keyframes pulse-slow { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
    @keyframes bounce-slow { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
    @keyframes spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    .animate-fade-in-up { animation:fade-in-up 0.6s ease-out forwards; }
    .animate-fade-in-stagger { animation:fade-in-stagger 0.5s ease-out forwards; }
    .animate-slide-up { animation:slide-up 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }
    .animate-fade-in { animation:fade-in 0.3s ease-in; }
    .animate-float { animation:float 3s ease-in-out infinite; }
    .animate-pulse-slow { animation:pulse-slow 2s infinite; }
    .animate-bounce-slow { animation:bounce-slow 2s infinite; }
    .animate-spin-slow { animation:spin-slow 8s linear infinite; }
  `;
  document.head.appendChild(style);
}

export default App;
