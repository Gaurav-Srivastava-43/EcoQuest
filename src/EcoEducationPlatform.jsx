import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Sun,
  Droplet,
  Users, 
  BookOpen, 
  Calendar, 
  Lightbulb, 
  Heart, 
  Trophy, 
  Info,
  User,
  LogIn,
  Home,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  Play,
  Gamepad2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Recycle,
  Wind,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { motion } from "framer-motion";
//import { Card, CardContent } from "@/components/ui/card";
//import { Button } from "@/components/ui/button";

const EcoEducationPlatform = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [floatingLeaves, setFloatingLeaves] = useState([]);

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);


  // Floating leaves animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingLeaves((prev) => [
        ...prev,
        { id: Date.now(), x: Math.random() * 100 },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  // Sample data
  const carouselItems = [
    {
      title: "Did You Know?",
      content: "A single tree can absorb 48 pounds of CO2 per year and produce oxygen for 2 people!",
      icon: <Leaf className="w-8 h-8" />
    },
    {
      title: "Green Fact",
      content: "Recycling one aluminum can saves enough energy to power a TV for 3 hours!",
      icon: <Lightbulb className="w-8 h-8" />
    },
    {
      title: "Ocean News",
      content: "Marine protected areas have increased by 300% in the last decade!",
      icon: <Heart className="w-8 h-8" />
    }
  ];

  const leaderboard = [
    { name: "EcoWarrior123", points: 2450, badge: "🌟" },
    { name: "GreenThumb", points: 2380, badge: "🌱" },
    { name: "ClimateChamp", points: 2290, badge: "🏆" },
    { name: "NatureLover", points: 2150, badge: "🌿" },
    { name: "You", points: ecoPoints, badge: "🌍" }
  ];

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'know-more', label: 'Know More', icon: Lightbulb },
    { id: 'contribute', label: 'Contribute', icon: Heart },
    { id: 'ecoplay', label: 'EcoPlay', icon: Gamepad2 },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentUser({ name: "EcoQuester", email: "eco@example.com" });
    setEcoPoints(150);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setEcoPoints(0);
  };

  const addEcoPoints = (points) => {
    setEcoPoints(prev => prev + points);
  };

   const NavBar = () => (
    <nav className= "min-h-20 bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-xl sticky top-0 z-50">
      <div className="h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            {/* <Leaf className="w-8 h-8" /> */}
            {/* moz-todo-react\src\EcoQuestLogo.png */}
            <img src="EcoQuestLogo.png" class="w-16 h-16 bg-amber-50 rounded-full" />
            <div>
              <span className="text-xl font-bold">EcoQuest</span>
              <div className="text-sm text-teal-200">Learn. Play. Act. Protect.</div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors bg-amber-50 text-teal-600 text-sm ${
                    activeSection === item.id ? 'active:bg-teal-200' : 'hover:opacity-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <Leaf className="w-4 h-4 text-green-300" />
                <span className="font-semibold">{ecoPoints}</span>
              </div>
            )}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <User className="w-6 h-6" />
                <span className="hidden md:inline">{currentUser?.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-1 text-teal-600 bg-red-400 hover:bg-red-600 rounded-md text-sm transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-1 px-4 py-2 bg-white text-teal-600 rounded-md hover:bg-gray-50 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-50" /> : <Menu className="w-6 h-6 text-amber-50s" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/10 rounded-lg m-2 p-4">
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors text-amber-50 text-sm ${
                      activeSection === item.id ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const Carousel = () => (
    <div className="relative bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-8 overflow-hidden shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Daily Eco Facts</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)}
            className="p-2 bg-white/50 hover:bg-white/70 rounded-full transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselItems.length)}
            className="p-2 bg-white/50 hover:bg-white/70 rounded-full transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-teal-600">
          {carouselItems[currentSlide].icon}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">
            {carouselItems[currentSlide].title}
          </h4>
          <p className="text-gray-600">
            {carouselItems[currentSlide].content}
          </p>
        </div>
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-teal-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );

  const GameCard = ({ title, description, points, difficulty, onClick }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer transform hover:scale-105"
         onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Play className="w-5 h-5 text-teal-600" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {difficulty}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-teal-600">
          <Star className="w-4 h-4" />
          <span className="font-semibold">+{points}</span>
        </div>
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );

  const LeaderBoardComponent = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
        Leaderboard
      </h3>
      <div className="space-y-3">
        {leaderboard
          .sort((a, b) => b.points - a.points)
          .map((user, index) => (
            <div
              key={user.name}
              className={`flex items-center justify-between p-3 rounded-lg ${
                user.name === 'You' ? 'bg-teal-50 border-2 border-teal-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{user.badge}</span>
                <span className="font-medium">{user.name}</span>
                {index < 3 && (
                  <Award className={`w-4 h-4 ${
                    index === 0 ? 'text-yellow-500' :
                    index === 1 ? 'text-gray-400' :
                    'text-amber-600'
                  }`} />
                )}
              </div>
              <span className="font-semibold text-teal-600">{user.points}</span>
            </div>
          ))}
      </div>
    </div>
  );

  // Section Components
  const HomeSection = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to EcoQuest
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A gamified environmental education platform.
        </p>
      </div>

      <Carousel />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Platform Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-xl">
              <BookOpen className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Interactive Learning</h4>
              <p className="text-gray-600">Engage with immersive environmental education content and earn points</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-xl shadow-xl">
              <Users className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Community Events</h4>
              <p className="text-gray-600">Join workshops, webinars, and eco-challenges with other learners</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl shadow-xl">
              <Award className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Gamification</h4>
              <p className="text-gray-600">Collect points, badges, and certificates as you learn</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl shadow-xl">
              <Gamepad2 className="w-8 h-8 text-yellow-600 mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Interactive Games</h4>
              <p className="text-gray-600">Play educational games and compete with other eco-warriors</p>
            </div>
          </div>
        </div>

        <div>
          <LeaderBoardComponent />
        </div>
      </div>
    </div>
  );

  const LearnSection = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Learning Hub</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            For Teachers
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Teacher's Guide</h4>
              <p className="text-blue-600 text-sm">Comprehensive guides for environmental education</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Lesson Plans</h4>
              <p className="text-blue-600 text-sm">Ready-to-use interactive lesson plans</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">SkillUp Workshops</h4>
              <p className="text-blue-600 text-sm">Professional development opportunities</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Teaching Resources</h4>
              <p className="text-blue-600 text-sm">Downloadable materials and multimedia content</p>
            </div>
          </div>
          <button 
            onClick={() => addEcoPoints(20)}
            className="mt-6 w-full px-4 py-2 bg-blue-600 text-amber-50 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Access Teacher Resources (+20 points)
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-green-600" />
            For Students
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Interactive Modules</h4>
              <p className="text-green-600 text-sm">Engaging learning modules with multimedia content</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Certification Courses</h4>
              <p className="text-green-600 text-sm">Earn certificates in environmental science</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Competitions</h4>
              <p className="text-green-600 text-sm">Participate in environmental challenges</p>
            </div>
          </div>
          <button 
            onClick={() => addEcoPoints(15)}
            className="mt-6 w-full px-4 py-2 bg-green-600 text-amber-50 rounded-lg hover:bg-green-800 transition-colors"
          >
            Start Learning (+15 points)
          </button>
        </div>
      </div>
    </div>
  );

  const EventsSection = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Events & Activities</h2>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Workshops</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">Climate Action Workshop</h4>
              <p className="text-blue-600 text-sm mt-1">Oct 15, 2025 • 45 participants</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">Renewable Energy Workshop</h4>
              <p className="text-blue-600 text-sm mt-1">Oct 28, 2025 • 32 participants</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Webinars</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">Sustainable Technology Trends</h4>
              <p className="text-green-600 text-sm mt-1">Oct 22, 2025 • 128 participants</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">Ocean Conservation</h4>
              <p className="text-green-600 text-sm mt-1">Nov 3, 2025 • 89 participants</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Contests</h3>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800">Eco Innovation Challenge</h4>
              <p className="text-purple-600 text-sm mt-1">Nov 5-15, 2025 • Submit your green innovations</p>
              <button 
                onClick={() => addEcoPoints(30)}
                className="mt-2 px-4 py-2 bg-purple-600 text-amber-50 rounded-lg hover:bg-purple-800 transition-colors"
              >
                Join Contest (+30 points)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Organize Events</h3>
          <p className="text-gray-600 mb-4">Want to organize your own environmental event? We provide tools and support!</p>
          <button className="px-6 py-3 bg-teal-600 text-amber-50 rounded-lg hover:bg-teal-800 transition-colors">
            Create Event
          </button>
        </div>
      </div>
    </div>
  );

  const KnowMoreSection = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Know More</h2>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            Latest News
          </h3>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h4 className="font-semibold text-gray-800">UN Climate Summit 2025 Outcomes</h4>
              <p className="text-gray-600 text-sm mt-1">Global leaders commit to new carbon reduction targets...</p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h4 className="font-semibold text-gray-800">Breakthrough in Solar Panel Efficiency</h4>
              <p className="text-gray-600 text-sm mt-1">New technology achieves 35% efficiency in laboratory tests...</p>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
              <h4 className="font-semibold text-gray-800">Ocean Plastic Cleanup Milestone</h4>
              <p className="text-gray-600 text-sm mt-1">Project reaches 100,000 kg of plastic removed from oceans...</p>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
            Sustainable Inventions
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Biodegradable Plastic Alternative</h4>
              <p className="text-yellow-600 text-sm mt-1">Made from seaweed, completely ocean-safe</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Atmospheric Water Generator</h4>
              <p className="text-yellow-600 text-sm mt-1">Extracts clean water from air humidity</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Carbon-Capture Building Materials</h4>
              <p className="text-yellow-600 text-sm mt-1">Concrete that absorbs CO2 while curing</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Vertical Farming Systems</h4>
              <p className="text-yellow-600 text-sm mt-1">90% less water, 365-day growing seasons</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Wind className="w-5 h-5 mr-2 text-green-600" />
            Green Technologies
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">Renewable Energy Storage</h4>
              <p className="text-green-600 text-sm mt-1">Advanced battery technologies for solar and wind power</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">Smart Grid Systems</h4>
              <p className="text-green-600 text-sm mt-1">AI-powered energy distribution and optimization</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800">Green Transportation</h4>
              <p className="text-green-600 text-sm mt-1">Electric vehicles, hydrogen fuel cells, and sustainable fuels</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContributeSection = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Contribute to Our Mission</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Participate</h3>
          <p className="text-gray-600 mb-4">Join our community activities and spread environmental awareness in your area</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-500">• Community cleanups</div>
            <div className="text-sm text-gray-500">• Educational outreach</div>
            <div className="text-sm text-gray-500">• Social media campaigns</div>
          </div>
          <button 
            onClick={() => addEcoPoints(25)}
            className="w-full px-4 py-2 bg-blue-600 text-amber-50 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Get Involved (+25 points)
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Donate & Fundraise</h3>
          <p className="text-gray-600 mb-4">Support environmental projects and educational initiatives worldwide</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-500">• Tree planting projects</div>
            <div className="text-sm text-gray-500">• Educational scholarships</div>
            <div className="text-sm text-gray-500">• Conservation efforts</div>
          </div>
          <button className="w-full px-4 py-2 bg-red-600 text-amber-50 rounded-lg hover:bg-red-800 transition-colors">
            Donate Now
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Organize Activities</h3>
          <p className="text-gray-600 mb-4">Create and host environmental education events in your community</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-500">• Workshop planning</div>
            <div className="text-sm text-gray-500">• Event promotion</div>
            <div className="text-sm text-gray-500">• Resource sharing</div>
          </div>
          <button className="w-full px-4 py-2 bg-green-600 text-amber-50 rounded-lg hover:bg-green-800 transition-colors">
            Start Planning
          </button>
        </div>
      </div>
    </div>
  );

  const CarbonFootprintQuiz = ({ onComplete }) => {
    const questions = [
      {
        question: "Which activity produces the most CO2 emissions?",
        options: ["Taking a car", "Riding a bicycle", "Walking", "Using public transport"],
        answer: 0
      },
      {
        question: "What is the biggest source of greenhouse gas emissions globally?",
        options: ["Agriculture", "Transportation", "Electricity & Heat Production", "Deforestation"],
        answer: 2
      },
      {
        question: "Which of these helps reduce your carbon footprint?",
        options: ["Eating more red meat", "Using energy-efficient appliances", "Flying frequently", "Leaving lights on"],
        answer: 1
      }
    ];
    const handleAnswer = (index) => {
    if (index === questions[currentQ].answer) {
      setScore(score + 1);
    }
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setCompleted(true);
      onComplete(score + (index === questions[currentQ].answer ? 1 : 0));
    }
  };

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl mx-auto">
      {!completed ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">{questions[currentQ].question}</h3>
          <div className="space-y-3">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full px-4 py-2 bg-teal-100 hover:bg-teal-200 rounded-lg transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Question {currentQ + 1} of {questions.length}
          </p>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Quiz Completed 🎉</h3>
          <p className="mb-2 text-lg">Your Score: {score} / {questions.length}</p>
          <p className="mb-4 text-gray-600">
            That’s <span className="font-semibold">{percentage}%</span>
          </p>

          {percentage >= 70 ? (
            <p className="text-green-600 font-semibold mb-4">
              🌍 Great job! You really know how to cut carbon!
            </p>
          ) : (
            <p className="text-yellow-600 font-semibold mb-4">
              Keep learning — small actions lead to big changes!
            </p>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setCurrentQ(0);
                setScore(0);
                setCompleted(false);
              }}
              className="px-4 py-2 bg-blue-600 text-gray-600 rounded-lg hover:bg-blue-700"
            >
              Retry Quiz
            </button>
            <button
              onClick={() => setShowQuiz(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Back to EcoPlay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

  const EcoPlaySection = () => {

    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">EcoPlay - Interactive Games</h2>

        {showQuiz ? (
        <CarbonFootprintQuiz
          onComplete={(score) => {
          addEcoPoints(score * 10); // award points
        }}
        setShowQuiz={setShowQuiz}
        />
    ) : (
     <>

            {/* 🔹 Preserve your original EcoPlay content */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GameCard
                title="Carbon Footprint Quiz"
                description="Test your knowledge about reducing carbon emissions and learn sustainable practices"
                points={25}
                difficulty="Easy"
                onClick={() => setShowQuiz(true)}
              />
              <GameCard
                title="Recycling Challenge"
                description="Sort waste materials into correct recycling categories within the time limit"
                points={35}
                difficulty="Medium"
                onClick={() => addEcoPoints(35)}
              />
              <GameCard
                title="Ecosystem Balance"
                description="Maintain ecological balance in virtual environments by managing resources"
                points={50}
                difficulty="Hard"
                onClick={() => addEcoPoints(50)}
              />
              <GameCard
                title="Energy Conservation"
                description="Optimize energy usage in a virtual city to minimize environmental impact"
                points={40}
                difficulty="Medium"
                onClick={() => addEcoPoints(40)}
              />
              <GameCard
                title="Ocean Cleanup"
                description="Navigate through ocean waters to collect plastic waste and save marine life"
                points={30}
                difficulty="Easy"
                onClick={() => addEcoPoints(30)}
              />
              <GameCard
                title="Climate Strategy"
                description="Develop strategies to combat climate change as a world leader"
                points={60}
                difficulty="Hard"
                onClick={() => addEcoPoints(60)}
              />
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Game Achievements</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl mb-2">🌱</div>
                  <div className="font-semibold text-sm">Eco Beginner</div>
                  <div className="text-xs text-gray-500">Complete 5 games</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl mb-2">🌿</div>
                  <div className="font-semibold text-sm">Green Warrior</div>
                  <div className="text-xs text-gray-500">Earn 500 points</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="font-semibold text-sm">Eco Champion</div>
                  <div className="text-xs text-gray-500">Top 10 leaderboard</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="font-semibold text-sm">Planet Protector</div>
                  <div className="text-xs text-gray-500">Complete all games</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const AboutSection = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">About EcoQuest</h2>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-blue-600" />
            Contact Us
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span>contact@ecoquest.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>XXXXXXXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>ABC, XYZ street </span>
              </div>
            </div>
            <div>
              <button className="w-full px-6 py-3 bg-blue-600 text-amber-50 rounded-lg hover:bg-blue-800 transition-colors mb-3">
                Send Message
              </button>
              <button className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Schedule Call
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">What We Do</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Educational Content</h4>
              <p className="text-gray-600 text-sm">Creating engaging environmental education materials for all ages</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Community Building</h4>
              <p className="text-gray-600 text-sm">Connecting eco-conscious individuals and organizations worldwide</p>
            </div>
            <div className="text-center">
              <Gamepad2 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Gamification</h4>
              <p className="text-gray-600 text-sm">Making environmental learning fun through interactive games and challenges</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Encourage Us</h3>
          <p className="text-gray-600 mb-4">Help us spread environmental awareness and education worldwide. Your support makes a difference!</p>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-green-600 text-gray-800 rounded-lg hover:bg-green-700 transition-colors">
              Share Our Mission
            </button>
            <button className="px-4 py-2 bg-blue-600 text-gray-800 rounded-lg hover:bg-blue-700 transition-colors">
              Volunteer
            </button>
            <button className="px-4 py-2 bg-purple-600 text-gray-800 rounded-lg hover:bg-purple-700 transition-colors">
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LeaderboardSection = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Global Leaderboard</h2>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Top Eco-Warriors</h3>
            <div className="space-y-4">
              {[
                { name: "EcoWarrior123", points: 2450, badge: "🌟", country: "USA", streak: 45 },
                { name: "GreenThumb", points: 2380, badge: "🌱", country: "Canada", streak: 38 },
                { name: "ClimateChamp", points: 2290, badge: "🏆", country: "UK", streak: 42 },
                { name: "NatureLover", points: 2150, badge: "🌿", country: "Australia", streak: 29 },
                { name: "EcoHero2025", points: 2100, badge: "⭐", country: "Germany", streak: 35 },
                { name: "PlanetSaver", points: 1980, badge: "🌍", country: "Brazil", streak: 31 },
                { name: "You", points: ecoPoints, badge: "🌍", country: "Global", streak: Math.floor(ecoPoints / 50) }
              ].sort((a, b) => b.points - a.points).map((user, index) => (
                <div
                  key={user.name}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    user.name === 'You' ? 'bg-teal-50 border-2 border-teal-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-amber-600' :
                        'bg-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{user.badge}</span>
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-xs text-gray-500">({user.country})</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.streak} day streak 🔥
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-teal-600 text-lg">{user.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Challenge</h3>
            <div className="text-center p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
              <div className="text-2xl mb-2">🌊</div>
              <div className="font-semibold">Ocean Conservation Week</div>
              <div className="text-sm text-gray-600 mt-1">Complete ocean-themed activities</div>
              <div className="text-xs text-gray-500 mt-2">Ends in 3 days</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Points</span>
                <span className="font-semibold text-teal-600">{ecoPoints}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Games Played</span>
                <span className="font-semibold">{Math.floor(ecoPoints / 30)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Streak</span>
                <span className="font-semibold">{Math.floor(ecoPoints / 50)} days 🔥</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rank</span>
                <span className="font-semibold">#{leaderboard.filter(u => u.points > ecoPoints).length + 1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'learn':
        return <LearnSection />;
      case 'events':
        return <EventsSection />;
      case 'know-more':
        return <KnowMoreSection />;
      case 'contribute':
        return <ContributeSection />;
      case 'ecoplay':
        return <EcoPlaySection />;
      case 'about':
        return <AboutSection />;
      case 'leaderboard':
        return <LeaderboardSection />;
      default:
        return <HomeSection />;
    }
  };

  //bg-[url('environment.jpg')] bg-cover bg-bottom
//bg-gradient-to-br from-slate-50 to-emerald-50
  return (
    <div className="bg-gradient-to-br from-slate-50 to-emerald-50">
      <NavBar />
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Floating Leaves */}
        {floatingLeaves.map((leaf) => (
        <div>
        <motion.div
          key={leaf.id}
          initial={{ y: -50, x: `${leaf.x}%`, opacity: 1 }}
          animate={{ y: "110vh", opacity: 0 }}
          transition={{ duration: 8, ease: "easeIn" }}
          className="absolute text-2xl"
        >
          🍃
        </motion.div>
        <motion.div
          key={leaf.id}
          initial={{ y: -50, x: "30vw" , opacity: 1 }}
          animate={{ y: "110vh", opacity: 0 }}
          transition={{ duration: 8, ease: "easeIn" }}
          className="absolute text-2xl"
        >
          🍀
        </motion.div>
        <motion.div
          key={leaf.id}
          initial={{ y: -50, x:"60vw" , opacity: 1 }}
          animate={{ y: "110vh", opacity: 0 }}
          transition={{ duration: 8, ease: "easeIn" }}
          className="absolute text-2xl"
        >
          🍀	
        </motion.div>
        <motion.div
          key={leaf.id}
          initial={{ y: -50, x: "90vw", opacity: 1 }}
          animate={{ y: "110vh", opacity: 0 }}
          transition={{ duration: 8, ease: "easeIn" }}
          className="absolute text-2xl"
        >
          🍃
        </motion.div>
        </div>
      ))}
        {renderActiveSection()}
      </main>
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Links & References</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Environmental Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Scientific Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner Organizations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Copyright Notice</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Credits</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Educational Content Team</li>
                <li>Environmental Experts</li>
                <li>Community Contributors</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 EcoQuest Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcoEducationPlatform;
