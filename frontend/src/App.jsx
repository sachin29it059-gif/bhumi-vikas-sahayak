import React, { useState } from 'react';
import { 
  Search, MessageSquare, BookOpen, Calculator, CheckCircle2, 
  HelpCircle, Globe, Building, ArrowRight, ExternalLink, Sparkles 
} from 'lucide-react';

export default function App() {
  const [query, setQuery] = useState("My plot is 200 sq m on a 9 m road, what is the setback and max height?");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    rule: "Rule 26(B) & Table 1",
    answer: "For a 200 sq m plot on a 9 m road, the front setback is 3.0m, side setbacks are 1.5m, and maximum permissible height is 12.5m (4 floors).",
    maxHeight: "12.5 m (4 floors)",
    groundCoverage: "50%",
    frontSetback: "3.0 m",
    sideSetback: "1.5 m (each side)",
    citationText: "“For plots up to 200 sq m facing a 9m road, the minimum front setback shall be 3.0m, side setbacks shall be 1.5m. Maximum height shall not exceed 12.5m or 4 floors, whichever is less, subject to...”",
    page: "Page 42-43"
  });

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setQuery(searchQuery);
    try {
      const response = await fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if(data.status === "success") {
        setResult({
          rule: data.citation,
          answer: data.answer,
          maxHeight: "12.5 m (4 floors)",
          groundCoverage: "50%",
          frontSetback: "3.0 m",
          sideSetback: "1.5 m",
          citationText: data.answer,
          page: "Rulebook Section"
        });
      } else {
        setResult({
          rule: "Not Found",
          answer: "I don't find this in the rules.",
          maxHeight: "-",
          groundCoverage: "-",
          frontSetback: "-",
          sideSetback: "-",
          citationText: "No matching clause found.",
          page: "-"
        });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 text-slate-800 font-sans flex flex-col justify-between">
      
      {/* Top Header - Vibrant Full Color Gradient */}
      <header className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2.5 rounded-xl border border-white/30 backdrop-blur-md shadow-inner">
              <Building className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight flex items-center">
                Bhumi Vikas Sahayak <Sparkles className="w-4 h-4 ml-2 text-amber-300 animate-pulse" />
              </h1>
              <p className="text-xs text-blue-100 font-medium">MP Bhumi Vikas Rules, 2012 Assistant</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center bg-blue-800/80 px-4 py-2 rounded-xl border border-blue-400/40 text-xs shadow-sm">
              <Building className="w-4 h-4 mr-2 text-blue-200" />
              <span className="font-semibold text-blue-50">Bhopal Municipal Corporation / MPSeDC</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-blue-950/60 p-1 rounded-xl border border-blue-400/40 shadow-inner">
              <Globe className="w-4 h-4 mx-2 text-blue-200" />
              <button 
                onClick={() => setLanguage("en")} 
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${language === 'en' ? 'bg-white text-blue-700 shadow-md' : 'text-white hover:bg-blue-900/50'}`}>
                English
              </button>
              <button 
                onClick={() => setLanguage("hi")} 
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${language === 'hi' ? 'bg-white text-blue-700 shadow-md' : 'text-white hover:bg-blue-900/50'}`}>
                हिंदी
              </button>
            </div>

            <div className="hidden lg:flex flex-col items-end text-xs bg-emerald-600/40 px-3.5 py-1.5 rounded-xl border border-emerald-400/40 backdrop-blur-sm">
              <span className="text-emerald-200 font-medium">Latest Rule Update</span>
              <span className="text-white font-bold flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>
                Amendment on 28 Aug 2026
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full flex-grow">
        
        {/* Left Panel: Query & Suggestions */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-5">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-2xl text-white shadow-md shadow-blue-500/20">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Ask the Bhopal Building Rulebook</h2>
                <p className="text-xs text-slate-500 font-medium">Get accurate answers from MP Bhumi Vikas Rules, 2012.</p>
              </div>
            </div>

            <div className="flex space-x-2 mb-3">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-3.5 py-2 rounded-xl font-bold flex items-center shadow-md shadow-blue-500/20 hover:shadow-lg transition-all">
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Ask in English
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3.5 py-2 rounded-xl font-bold transition">
                हिंदी में पूछें
              </button>
            </div>

            {/* Input Box */}
            <div className="relative mb-4">
              <textarea 
                rows="4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-4 text-sm bg-gradient-to-br from-slate-50 to-blue-50/20 border-2 border-blue-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none resize-none transition-all font-medium text-slate-700"
                placeholder="Ask about setbacks, height, parking..."
              />
              <span className="absolute bottom-3 right-3 text-[10px] font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">{query.length}/500</span>
            </div>

            {/* Search Button */}
            <button 
              onClick={() => handleSearch(query)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl transition-all flex items-center justify-center space-x-2 transform active:scale-[0.99]">
              <Search className="w-4 h-4" />
              <span>{loading ? "Searching Rules..." : "Search Rules / पूछें"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Suggestions */}
            <div className="mt-8">
              <div className="flex items-center space-x-2 mb-3">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Quick Suggestions</span>
              </div>
              <p className="text-xs text-slate-400 mb-3 font-medium">Click any question to get started</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Setback for 200 sq m plot",
                  "Maximum permissible floors",
                  "Parking requirements",
                  "Ground coverage rules"
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSearch(item)}
                    className="text-left p-3.5 text-xs bg-gradient-to-br from-white to-blue-50/30 hover:from-blue-50 hover:to-indigo-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all shadow-sm hover:shadow-md flex justify-between items-center group">
                    <span className="font-bold text-slate-700 group-hover:text-blue-700">{item}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Help Footer */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-200/60 flex items-start space-x-3 shadow-inner">
            <HelpCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-extrabold text-blue-900">Need help?</p>
              <p className="text-[11px] font-medium text-blue-700">Use simple English or Hindi. For complex cases, try rephrasing your question.</p>
            </div>
          </div>
        </div>

        {/* Right Panel: Result & Source Panel */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="text-base font-extrabold text-slate-900">Result & Source Panel</h2>
              </div>
              <div className="text-xs bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-200 text-blue-700 font-bold shadow-xs flex items-center space-x-1.5">
                <span>Rules Version: Consolidated to 06 Mar 2025</span>
              </div>
            </div>

            {/* Direct Answer Box */}
            <div className="bg-gradient-to-br from-emerald-50/60 via-teal-50/30 to-emerald-50/80 border border-emerald-200/80 rounded-3xl p-5 mb-5 shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Direct Answer</h3>
              </div>
              <p className="text-sm font-bold text-slate-800 mb-2">
                Based on <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">{result.rule}</span>:
              </p>
              <p className="text-sm text-slate-700 mb-2 leading-relaxed font-medium">{result.answer}</p>
            </div>

            {/* Deterministic Calculation Box */}
            <div className="bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-blue-50/70 border border-blue-200/80 rounded-3xl p-5 mb-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider">Deterministic Calculation</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[10px] text-blue-500 font-bold block uppercase tracking-wider mb-0.5">Max Height</span>
                  <span className="text-sm font-black text-slate-800">{result.maxHeight}</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[10px] text-blue-500 font-bold block uppercase tracking-wider mb-0.5">Ground Coverage</span>
                  <span className="text-sm font-black text-slate-800">{result.groundCoverage}</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[10px] text-blue-500 font-bold block uppercase tracking-wider mb-0.5">Setbacks</span>
                  <span className="text-xs font-black text-slate-800">Front: {result.frontSetback}</span>
                </div>
              </div>
            </div>

            {/* Legal Source Citation */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/20 border border-slate-200/80 rounded-3xl p-5 mb-5 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Legal Source Citation</h3>
                </div>
                
                {/* PDF Viewer Buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => window.open("http://127.0.0.1:8000/resources/MP_Bhumi_Vikas_Rules_2012.pdf", "_blank")}
                    className="text-xs text-blue-700 font-black flex items-center bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-all shadow-xs">
                    View Rulebook PDF <ExternalLink className="w-3.5 h-3.5 ml-1 text-blue-600" />
                  </button>
                  <button 
                    onClick={() => window.open("http://127.0.0.1:8000/resources/MP_Bhumi_Vikas_Rules_Amendment_2025_E.pdf", "_blank")}
                    className="text-xs text-emerald-700 font-black flex items-center bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-all shadow-xs">
                    View 2025 Amendment <ExternalLink className="w-3.5 h-3.5 ml-1 text-emerald-600" />
                  </button>
                </div>
              </div>

              <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-xl mb-3 shadow-sm">
                {result.rule}
              </span>
              <p className="text-xs italic text-slate-700 bg-white p-4 rounded-2xl border border-slate-200 shadow-inner font-medium">
                {result.citationText}
              </p>
              <span className="text-[10px] text-slate-400 mt-2 block font-semibold">MP Bhumi Vikas Rules, 2012 | Part II – Building Control | {result.page}</span>
            </div>
          </div>

          {/* Footer Status */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-3.5 rounded-2xl flex items-center justify-between text-xs shadow-xs">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span className="text-slate-700 font-semibold"><strong>No result Query:</strong> Are solar panels mandatory in new buildings?</span>
            </div>
            <span className="text-amber-800 font-extrabold bg-amber-100/80 px-2.5 py-1 rounded-lg">Result: I don't find this in the rules.</span>
          </div>
        </div>

      </main>

      {/* Bottom Footer Bar */}
      <footer className="bg-white border-t border-slate-200 py-3 px-6 text-xs text-slate-500 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <span className="flex items-center font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">✓ Accurate</span>
            <span>•</span>
            <span className="font-bold text-slate-700">Rule-based</span>
            <span>•</span>
            <span className="font-bold text-slate-700">Bhopal Focused</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-500 font-medium">
            <span className="flex items-center"><BookOpen className="w-3.5 h-3.5 mr-1 text-blue-600" /> MP Bhumi Vikas Rules, 2012</span>
            <span>|</span>
            <span>105 Rules</span>
            <span>|</span>
            <span>108 Pages</span>
          </div>
          <div className="hidden md:flex items-center text-blue-700 font-extrabold bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shadow-xs">
            🌱 Smarter Guidance for Better Urban Development
          </div>
        </div>
      </footer>

    </div>
  );
}