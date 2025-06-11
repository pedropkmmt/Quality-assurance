import React, { useState } from 'react';
import { Phone, Users, TrendingUp, MessageSquare, Search, Star, Clock, CheckCircle, AlertTriangle, Settings } from 'lucide-react';

const CallSenseQA = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [selectedCall, setSelectedCall] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiKey, setApiKey] = useState('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');
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState('');

  const callData = [
    {
      id: '1',
      customer: 'Julie Kelly',
      agent: 'David Rogers',
      date: '2025-05-18',
      duration: '43s',
      type: 'Wrong Item Order',
      status: 'Resolved',
      score: 92,
      transcript: "Hello, this is David Rogers please?\n\nHi David, my name is Julie Kelly.\n\nThank you, Julie. How can I assist you today?\n\nI received the wrong item in my order, and I wanted to get this sorted out.\n\nI'm sorry to hear that, Julie. Let's get this resolved for you. Could you provide me with the order number, please?\n\nSure, the order number is two three four five.\n\nThank you. Could you also let me know the item you received and the item you were expecting?\n\nI received a yacht anchor, but I was expecting a navigation system.\n\nI apologize for the mix-up, Julie. I will ensure we get the correct navigation system sent to you right away.\n\nThank you very much for bringing this to our attention, Julie. We appreciate your patience and trust in us. Have a great day!"
    },
    {
      id: '2',
      customer: 'Patricia Bell',
      agent: 'Louis James',
      date: '2025-05-18',
      duration: '59s',
      type: 'Subscription Update',
      status: 'Resolved',
      score: 98,
      transcript: "Hello, thank you for calling Aquidneck Yacht Brokers. My name is Louis James. May I have the pleasure of knowing your name?\n\nHi Louis, my name is Patricia Bell. I'm happy to speak with you today.\n\nIt's great to meet you, Patricia! How can I assist you with your subscription today?\n\nI'm delighted with the services so far and just needed some help with updating some information.\n\nI'm glad to hear that you're enjoying our services! Could you please let me know your subscription ID so I can access your information?\n\nYes, of course. My subscription ID is A B C one two three four.\n\nThank you, Patricia. For security purposes, could you also confirm your registered email address?\n\nSure, my email address is patricia.bell@example.com.\n\nPerfect, everything matches up. Your details have been updated successfully. Is there anything else I can help you with today?\n\nNo, that's all. Thank you, Louis. You have been very helpful.\n\nYou're welcome, Patricia! Thank you for your time and for being a valued customer. Have a wonderful day!"
    },
     {
      id: '3',
      customer: 'Ann Wilson',
      agent: 'Vincent Bailey',
      date: '2025-05-18',
      duration: '56.208',
      type: 'Returns',
      status: 'Resolved',
      score: 98,
      transcript: "Hello, thank you for contacting Aquidneck Yacht Brokers. My name is Vincent Bailey. May I know your name, please?\n\nHi Vincent, my name is Ann Wilson.\n\nHello Ann, it's nice to meet you. How can I assist you today?\n\nWell, I'm feeling a bit sad because I need to make a return.\n\nI'm sorry to hear that, Ann. Let's get this sorted out for you. Could you please provide me with your order number?\n\nSure, it's two zero two five eight four.\n\nThank you, Ann. Could you also confirm the email address you used for the order?\n\nYes, it's ann.wilson@email.com.\n\nGreat, thank you for the information. I'll process your return request now. Please allow me a moment.\n\nAnn, your return has been processed. You will receive a confirmation email shortly. Thank you for your patience.\n\nThank you, Vincent. I appreciate your help.\n\nYou're welcome, Ann. Thank you for contacting Aquidneck Yacht Brokers. If you need further assistance, feel free to reach out. Have a great day!"
    }

  ];


  const analyzeCallWithGroq = async (call) => {
    if (!apiKey.trim()) {
      setError('Please configure your Groq API key in settings');
      return;
    }

    setIsAnalyzing(true);
    setAiAnalysis('');
    setError('');
    
    try {
      const prompt = `Analyze this customer service call transcript and provide detailed insights:

Customer: ${call.customer}
Agent: ${call.agent}
Call Type: ${call.type}
Duration: ${call.duration}
Current Score: ${call.score}/100

TRANSCRIPT:
${call.transcript}

Please provide a comprehensive analysis including:
1. STRENGTHS - What the agent did well
2. AREAS FOR IMPROVEMENT - Specific suggestions
3. COMPLIANCE ASSESSMENT - Professional standards adherence
4. CUSTOMER SENTIMENT - Overall customer experience
5. RECOMMENDED ACTIONS - Next steps for improvement
6. OVERALL SCORE - Your assessment out of 100

Format your response clearly with headers and bullet points.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are an expert customer service quality assurance analyst. Provide detailed, constructive feedback on call transcripts to help improve agent performance and customer satisfaction.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 1,
          max_tokens: 2048,
          stream: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                setAiAnalysis(prev => prev + content);
              }
            } catch (e) {
              
            }
          }
        }
      }
    } catch (error) {
      console.error('Groq API Error:', error);
      setError(`Analysis failed: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredCalls = callData.filter(call =>
    call.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">API Settings</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Groq API Key
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Groq API key"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Current Configuration:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Model: llama3-70b-8192</p>
              <p>Temperature: 1.0</p>
              <p>Max Tokens: 2048</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={() => setShowSettings(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Calls</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <Phone className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold">95.2</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Agents</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold">4.7</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Recent Calls</h3>
        <div className="space-y-3">
          {callData.slice(0, 3).map((call) => (
            <div key={call.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{call.customer}</p>
                <p className="text-sm text-gray-600">{call.agent} • {call.type}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">{call.score}</p>
                <p className="text-sm text-gray-500">{call.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CallsView = () => (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search calls..."
            className="w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredCalls.map((call) => (
          <div key={call.id} className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{call.customer}</h3>
                <p className="text-gray-600">Agent: {call.agent}</p>
                <p className="text-sm text-gray-500">{call.date} • {call.duration} • {call.type}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{call.score}</div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {call.status}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCall(call)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Transcript
              </button>
              <button
                onClick={() => analyzeCallWithGroq(call)}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
              >
                <MessageSquare className="h-4 w-4" />
                {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AIAnalysisView = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">AI-Powered Call Analysis</h2>
            <p className="text-gray-600">
              Get instant insights from your customer calls using Groq's Llama3-70B model.
            </p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}
        
        {isAnalyzing && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <p className="text-blue-800">Analyzing call with Groq AI (Llama3-70B)...</p>
            </div>
          </div>
        )}
        
        {aiAnalysis && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">AI Analysis Results:</h3>
            <div className="whitespace-pre-wrap text-sm text-gray-800 max-h-96 overflow-y-auto">
              {aiAnalysis}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-green-800">Strengths Identified</h3>
            <p className="text-sm text-green-700">AI identifies what agents are doing well</p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mb-2" />
            <h3 className="font-semibold text-yellow-800">Improvement Areas</h3>
            <p className="text-sm text-yellow-700">AI suggests specific areas for growth</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">How to Use:</h3>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Go to the "Calls" tab</li>
            <li>2. Click "AI Analysis" on any call</li>
            <li>3. Wait for the real-time analysis from Groq AI</li>
            <li>4. Review detailed insights and recommendations</li>
          </ol>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Phone className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">CallSense QA</h1>
              <p className="text-sm text-gray-600">AI-Powered Quality Assurance with Groq</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex space-x-6 mb-6">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'calls', label: 'Calls' },
            { id: 'ai-analysis', label: 'AI Analysis' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded font-medium ${
                selectedTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {selectedTab === 'dashboard' && <DashboardView />}
        {selectedTab === 'calls' && <CallsView />}
        {selectedTab === 'ai-analysis' && <AIAnalysisView />}
      </div>

      {selectedCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Call Transcript</h2>
                <button
                  onClick={() => setSelectedCall(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600">{selectedCall.customer} • {selectedCall.agent}</p>
            </div>
            <div className="p-4 overflow-y-auto max-h-96">
              <div className="whitespace-pre-line text-gray-800">
                {selectedCall.transcript}
              </div>
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => setSelectedCall(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showSettings && <SettingsModal />}
    </div>
  );
};

export default CallSenseQA;