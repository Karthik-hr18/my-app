import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- CSS for Page Transitions ---
const PageTransitions = () => (
    <style>{`
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(15px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .page-transition-enter {
            animation: fadeIn 0.4s ease-out;
        }
    `}</style>
);


// --- SVG Icon Components ---
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
);

const GithubIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const PlusIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 ${className}`}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);


// --- UI Components ---

const Spinner = () => (
  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
);

const ErrorDisplay = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};


// --- Page Content Components ---

const AboutUsPage = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600 mb-4">
                Welcome to AI Summarizer, your go-to solution for transforming long, complex documents into concise, easy-to-digest summaries. Our mission is to enhance productivity and learning by leveraging the power of artificial intelligence to save you time and effort.
            </p>
            <p className="text-gray-600">
                Founded in 2025, our team is passionate about creating tools that make information more accessible. We believe that in a world overflowing with data, the ability to quickly grasp key insights is more valuable than ever. Whether you're a student, a researcher, or a professional, AI Summarizer is designed to be an indispensable part of your toolkit.
            </p>
        </div>
    </div>
);

const FeaturesPage = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-4">
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Powerful AI Engine</h3>
                    <p className="text-gray-600">Utilizes a state-of-the-art AI model to understand context and extract the most critical information from your documents.</p>
                </div>
                <div className="text-center p-4">
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Summary History</h3>
                    <p className="text-gray-600">Never lose a summary again. Your past summaries are saved to your account for easy access anytime, anywhere.</p>
                </div>
                <div className="text-center p-4">
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Secure & Private</h3>
                    <p className="text-gray-600">Your documents and summaries are your own. We prioritize your privacy with secure authentication and data handling.</p>
                </div>
            </div>
        </div>
    </div>
);

const ContactPage = () => (
     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">Have questions or feedback? We'd love to hear from you. Reach out to us through any of the channels below.</p>
            <div className="space-y-4">
                <p><strong>Email:</strong> <a href="mailto:support@aisummarizer.com" className="text-indigo-600">support@aisummarizer.com</a></p>
                <p><strong>Phone:</strong> (123) 456-7890</p>
                <p><strong>Address:</strong> 123 Innovation Drive, Tech City, 12345</p>
            </div>
        </div>
    </div>
);


// --- Login Page Component ---

const LoginPage = ({ onLogin, prompt }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [loginId, setLoginId] = useState(''); // Can be username or email
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLoginView) {
            if (!loginId || !password) {
                setError('Please enter your Username/Email and Password.');
                return;
            }
            const isEmailFormat = /\S+@\S+\.\S+/.test(loginId);
            const usernameToPass = isEmailFormat ? loginId.split('@')[0] : loginId;
            onLogin({ email: loginId, username: usernameToPass });
        } else { // Sign Up View
            if (!username || !email || !password || !confirmPassword) {
                setError('Please fill out all fields.');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                setError('Please enter a valid email address.');
                return;
            }
            onLogin({ email, username });
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError('');
        setLoginId('');
        setPassword('');
        setUsername('');
        setEmail('');
        setConfirmPassword('');
    };

    return (
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
            <div className="text-center">
                 {prompt && <p className="text-lg font-semibold text-indigo-600 mb-2">{prompt}</p>}
                <h1 className="text-3xl font-bold text-gray-900">{isLoginView ? 'Welcome Back!' : 'Create an Account'}</h1>
                <p className="mt-2 text-gray-600">{isLoginView ? 'Sign in to access your summarizer' : 'Get started by creating a new account'}</p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                
                {isLoginView ? (
                    <>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                            <input id="loginId" name="loginId" type="text" autoComplete="username" required className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" placeholder="Username or Email" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                            <input id="username" name="username" type="text" required className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon /></div>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </>
                )}

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div>
                    <input id="password" name="password" type="password" autoComplete={isLoginView ? "current-password" : "new-password"} required className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" placeholder={isLoginView ? "Password" : "Create password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {!isLoginView && (
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon /></div>
                        <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required className="w-full pl-10 pr-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                )}

                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                        {isLoginView ? 'Sign in' : 'Sign up'}
                    </button>
                </div>
            </form>
            <div className="text-center">
                <button onClick={toggleView} className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
                    {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
            </div>
        </div>
    );
};


// --- Summarizer Page Component ---

const SummarizerPage = ({ user, onLogout }) => {
    const [documentText, setDocumentText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [pastSummaries, setPastSummaries] = useState([]);
    const [activeSummary, setActiveSummary] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const fileInputRef = useRef(null);

    const handleSummarize = useCallback(async () => {
        if (!documentText.trim()) {
            setError("Please paste the document text you want to summarize.");
            return;
        }
        setIsLoading(true);
        setError('');
        
        const systemPrompt = "You are an expert at summarizing documents. Take the following text and provide a concise, clear, and easy-to-understand summary. Focus on the key points and main ideas.";
        const userQuery = `Please summarize this document: \n\n${documentText}`;
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            const result = await response.json();
            const candidate = result.candidates?.[0];

            if (candidate?.content?.parts?.[0]?.text) {
                const newSummaryData = {
                    original: documentText,
                    summary: candidate.content.parts[0].text,
                    date: new Date(),
                };
                setPastSummaries(prev => [newSummaryData, ...prev]);
                setActiveSummary(newSummaryData);
                setDocumentText('');
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (err) {
            setError(err.message);
            console.error("API call error:", err);
        } finally {
            setIsLoading(false);
        }
    }, [documentText]);

    const handleNewSummary = () => {
        setActiveSummary(null);
        setDocumentText('');
        setError('');
    };

    const handleViewHistory = (summary) => {
        setActiveSummary(summary);
    };

    const triggerFileUpload = () => {
        if (isLoading || activeSummary !== null) return;
        fileInputRef.current.click();
    };

    const handleFileSelected = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setDocumentText(e.target.result);
                handleNewSummary(); // Go to new summary view with file content
            };
            reader.onerror = () => {
                setError('Error reading the selected file.');
            };
            reader.readAsText(file);
        }
        event.target.value = null; // Allow re-selecting the same file
    };

    return (
        <div className="h-screen w-screen bg-gray-100 font-sans text-gray-800 flex">
            <div className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
                <div className="p-4 space-y-4 flex-grow flex flex-col">
                    <button onClick={handleNewSummary} className="w-full flex items-center justify-center p-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors">
                        <PlusIcon className="mr-2" />
                        New Summary
                    </button>
                    <h2 className="text-sm font-semibold tracking-wider text-gray-400 mt-4">RECENT</h2>
                    <ul className="space-y-2 overflow-y-auto flex-grow">
                        {pastSummaries.map((item, index) => (
                            <li key={index}>
                                <button onClick={() => handleViewHistory(item)} className="w-full text-left p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 text-sm truncate">
                                    {item.original.substring(0, 30)}...
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex-1 flex flex-col h-screen">
                <header className="bg-white shadow-sm z-10">
                    <div className="flex justify-between items-center p-4">
                        <div className="flex items-center">
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-full hover:bg-gray-200 mr-4">
                                <MenuIcon />
                            </button>
                            <h1 className="text-xl font-bold text-indigo-600">AI Summarizer</h1>
                        </div>
                        <div className="flex items-center">
                             <span className="text-sm text-gray-600 mr-4 hidden sm:block capitalize">Welcome, {user.username}</span>
                             <button onClick={onLogout} className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200">
                                <LogoutIcon/>
                                Logout
                            </button>
                        </div>
                    </div>
                </header>
                
                <main className="flex-1 overflow-y-auto p-8">
                    {activeSummary ? (
                        <div className="bg-white p-6 rounded-xl shadow-md">
                             <h2 className="text-2xl font-semibold mb-4 text-gray-700">Summary Result</h2>
                             <div className="prose max-w-none text-gray-600 whitespace-pre-wrap">{activeSummary.summary}</div>
                             <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Original Document</h3>
                             <p className="text-gray-500 text-sm whitespace-pre-wrap">{activeSummary.original}</p>
                        </div>
                    ) : (
                         <div className="text-center h-full flex flex-col justify-center items-center">
                            <h2 className="text-4xl font-bold text-gray-700">Hello, {user.username}</h2>
                            <p className="text-gray-500 mt-2">How can I help you today?</p>
                         </div>
                    )}
                     <ErrorDisplay message={error} />
                </main>

                <footer className="p-4 bg-white border-t">
                    <div className="relative max-w-3xl mx-auto">
                        <input type="file" ref={fileInputRef} onChange={handleFileSelected} className="hidden" accept=".txt,.md,.rtf" />
                        <button onClick={triggerFileUpload} disabled={isLoading || activeSummary !== null} className="absolute bottom-3 left-3 p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed" title="Upload Document">
                             <PlusIcon className="h-6 w-6" />
                        </button>
                        <textarea
                            value={documentText}
                            onChange={(e) => setDocumentText(e.target.value)}
                            placeholder="Paste your document here or upload a file..."
                            className="w-full h-24 p-4 pl-16 pr-28 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                            disabled={isLoading || activeSummary !== null}
                        />
                         <button onClick={handleSummarize} disabled={isLoading || !documentText || activeSummary !== null} className="absolute bottom-3 right-3 flex items-center justify-center py-2 px-4 border border-transparent font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isLoading ? <Spinner /> : 'Summarize'}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

// --- Reusable Layout Components ---
const Navbar = ({ navigateTo, activePage }) => (
    <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <span className="text-xl font-bold text-indigo-600">AI Summarizer</span>
                <div className="hidden md:flex items-center space-x-8">
                    <button onClick={() => navigateTo('about')} className={`text-gray-600 hover:text-indigo-600 transition ${activePage === 'about' ? 'text-indigo-600 font-semibold' : ''}`}>About Us</button>
                    <button onClick={() => navigateTo('features')} className={`text-gray-600 hover:text-indigo-600 transition ${activePage === 'features' ? 'text-indigo-600 font-semibold' : ''}`}>Features</button>
                    <button onClick={() => navigateTo('contact')} className={`text-gray-600 hover:text-indigo-600 transition ${activePage === 'contact' ? 'text-indigo-600 font-semibold' : ''}`}>Contact</button>
                </div>
                <div className="flex items-center space-x-4">
                     <button onClick={() => navigateTo('login')} className="text-gray-600 hover:text-indigo-600 transition font-medium">Login / Sign Up</button>
                     <button onClick={() => navigateTo('login', 'Login / Sign up to get started')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-transform transform hover:scale-105">Get Started</button>
                </div>
            </div>
        </nav>
    </header>
);

const Footer = () => (
    <footer className="bg-white">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <TwitterIcon />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">GitHub</span>
                    <GithubIcon />
                </a>
            </div>
            <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} AI Summarizer. All rights reserved.
            </p>
        </div>
    </footer>
);

// --- Main App Component ---

function App() {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('login');
    const [loginPrompt, setLoginPrompt] = useState('');

    const handleLogin = (userData) => { // userData is {email, username}
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentPage('login'); // Go back to login page on logout
    };

    const navigateTo = (page, prompt = '') => {
        setCurrentPage(page);
        setLoginPrompt(prompt);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'about':
                return <AboutUsPage />;
            case 'features':
                return <FeaturesPage />;
            case 'contact':
                return <ContactPage />;
            case 'login':
            default:
                return <LoginPage onLogin={handleLogin} prompt={loginPrompt} />;
        }
    };

    return (
        <div>
            <PageTransitions />
            {user ? (
                <SummarizerPage user={user} onLogout={handleLogout} />
            ) : (
                <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
                    <Navbar navigateTo={navigateTo} activePage={currentPage} />
                    <main className="flex-grow flex items-center justify-center py-12 px-4">
                        <div key={currentPage} className="page-transition-enter w-full flex justify-center">
                           {renderPage()}
                        </div>
                    </main>
                    <Footer />
                </div>
            )}
        </div>
    );
}

export default App;

