import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Phone, Users, TrendingUp, Award, AlertTriangle, BookOpen, Search, Filter, Calendar, Download, Play, Star, CheckCircle, XCircle, Clock } from 'lucide-react';

const CallSenseQA = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [selectedCall, setSelectedCall] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAgent, setFilterAgent] = useState('all');

  const callData = [
    {
      id: '2c9117a9-a427-4425-aa75-388e91ef8cba',
      customer: 'Julie Kelly',
      agent: 'David Rogers',
      date: '2025-05-18',
      time: '15:19:53',
      duration: '43s',
      type: 'Wrong Item Order',
      status: 'Resolved',
      score: 92,
      transcript: "Hello, this is David Rogers please?\n\nHi David, my name is Julie Kelly.\n\nThank you, Julie. How can I assist you today?\n\nI received the wrong item in my order, and I wanted to get this sorted out.\n\nI'm sorry to hear that, Julie. Let's get this resolved for you. Could you provide me with the order number, please?\n\nSure, the order number is two three four five.\n\nThank you. Could you also let me know the item you received and the item you were expecting?\n\nI received a yacht anchor, but I was expecting a navigation system.\n\nI apologize for the mix-up, Julie. I will ensure we get the correct navigation system sent to you right away.\n\nThank you very much for bringing this to our attention, Julie. We appreciate your patience and trust in us. Have a great day!",
      metrics: {
        empathy: 95,
        accuracy: 88,
        resolution: 95,
        compliance: 85
      },
      insights: [
        'Excellent empathy and apology',
        'Quick problem identification',
        'Clear resolution provided',
        'Could improve order verification process'
      ]
    },
    {
      id: '7fc77f87-8a2d-4ab6-a42d-a8ac5bb9bfb0',
      customer: 'Patricia Bell',
      agent: 'Louis James',
      date: '2025-05-18',
      time: '13:39:35',
      duration: '59s',
      type: 'Subscription Update',
      status: 'Resolved',
      score: 98,
      transcript: "Hello, thank you for calling Aquidneck Yacht Brokers. My name is Louis James. May I have the pleasure of knowing your name?\n\nHi Louis, my name is Patricia Bell. I'm happy to speak with you today.\n\nIt's great to meet you, Patricia! How can I assist you with your subscription today?\n\nI'm delighted with the services so far and just needed some help with updating some information.\n\nI'm glad to hear that you're enjoying our services! Could you please let me know your subscription ID so I can access your information?\n\nYes, of course. My subscription ID is A B C one two three four.\n\nThank you, Patricia. For security purposes, could you also confirm your registered email address?\n\nSure, my email address is patricia.bell@example.com.\n\nPerfect, everything matches up. Your details have been updated successfully. Is there anything else I can help you with today?\n\nNo, that's all. Thank you, Louis. You have been very helpful.\n\nYou're welcome, Patricia! Thank you for your time and for being a valued customer. Have a wonderful day!",
      metrics: {
        empathy: 98,
        accuracy: 100,
        resolution: 100,
        compliance: 95
      },
      insights: [
        'Perfect professional greeting',
        'Excellent security verification',
        'High customer satisfaction',
        'Model conversation for training'
      ]
    }
  ];

  const agentPerformance = [
    { name: 'David Rogers', score: 92, calls: 15, satisfaction: 4.6 },
    { name: 'Louis James', score: 98, calls: 12, satisfaction: 4.9 },
    { name: 'Sarah Mitchell', score: 87, calls: 18, satisfaction: 4.4 },
    { name: 'Mike Johnson', score: 91, calls: 14, satisfaction: 4.7 }
  ];

  const complianceData = [
    { name: 'Security Verification', value: 92, color: '#10B981' },
    { name: 'Data Protection', value: 88, color: '#3B82F6' },
    { name: 'Call Procedures', value: 95, color: '#8B5CF6' },
    { name: 'Documentation', value: 85, color: '#F59E0B' }
  ];

  const weeklyTrends = [
    { day: 'Mon', score: 88, calls: 45 },
    { day: 'Tue', score: 91, calls: 52 },
    { day: 'Wed', score: 89, calls: 48 },
    { day: 'Thu', score: 93, calls: 51 },
    { day: 'Fri', score: 95, calls: 47 }
  ];

  const trainingScenarios = [
    {
      id: 1,
      title: 'Wrong Order Item Resolution',
      difficulty: 'Intermediate',
      based_on: 'Julie Kelly Call',
      objectives: ['Practice empathy', 'Order verification', 'Quick resolution'],
      completion_rate: 87
    },
    {
      id: 2,
      title: 'Subscription Management Excellence',
      difficulty: 'Beginner',
      based_on: 'Patricia Bell Call',
      objectives: ['Professional greeting', 'Security protocols', 'Customer satisfaction'],
      completion_rate: 94
    }
  ];

  const filteredCalls = callData.filter(call => {
    const matchesSearch = call.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAgent === 'all' || call.agent === filterAgent;
    return matchesSearch && matchesFilter;
  });

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Average Score</p>
              <p className="text-3xl font-bold">95.2</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-200" />
          </div>
          <p className="text-sm text-blue-100 mt-2">↑ 3.2% from last week</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Calls</p>
              <p className="text-3xl font-bold">243</p>
            </div>
            <Phone className="h-8 w-8 text-green-200" />
          </div>
          <p className="text-sm text-green-100 mt-2">↑ 12% from last week</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Compliance Rate</p>
              <p className="text-3xl font-bold">92%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-200" />
          </div>
          <p className="text-sm text-purple-100 mt-2">↑ 5% from last week</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Satisfaction</p>
              <p className="text-3xl font-bold">4.7</p>
            </div>
            <Star className="h-8 w-8 text-orange-200" />
          </div>
          <p className="text-sm text-orange-100 mt-2">↑ 0.3 from last week</p>
        </div>
      </div>

  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Weekly Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Compliance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={complianceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {complianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Agent Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={agentPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const CallAnalysisView = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search calls by customer, agent, or type..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
          >
            <option value="all">All Agents</option>
            <option value="David Rogers">David Rogers</option>
            <option value="Louis James">Louis James</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredCalls.map((call) => (
          <div key={call.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{call.customer}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    call.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {call.status}
                  </span>
                </div>
                <p className="text-gray-600">Agent: {call.agent} • {call.type}</p>
                <p className="text-sm text-gray-500">{call.date} at {call.time} • Duration: {call.duration}</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${call.score >= 95 ? 'text-green-600' : call.score >= 85 ? 'text-blue-600' : 'text-yellow-600'}`}>
                  {call.score}
                </div>
                <p className="text-sm text-gray-500">Overall Score</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-pink-600">{call.metrics.empathy}</div>
                <div className="text-xs text-gray-500">Empathy</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">{call.metrics.accuracy}</div>
                <div className="text-xs text-gray-500">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">{call.metrics.resolution}</div>
                <div className="text-xs text-gray-500">Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">{call.metrics.compliance}</div>
                <div className="text-xs text-gray-500">Compliance</div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Key Insights:</h4>
              <div className="flex flex-wrap gap-2">
                {call.insights.map((insight, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {insight}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCall(call)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                View Transcript
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Generate Training
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TrainingView = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Training Scenarios</h2>
        <p className="text-gray-600 mb-6">AI-generated training modules based on real customer interactions</p>

        <div className="grid gap-6">
          {trainingScenarios.map((scenario) => (
            <div key={scenario.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className={`px-2 py-1 rounded-full ${
                      scenario.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      scenario.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {scenario.difficulty}
                    </span>
                    <span>Based on: {scenario.based_on}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{scenario.completion_rate}%</div>
                  <div className="text-sm text-gray-500">Completion Rate</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Learning Objectives:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {scenario.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Start Training
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ComplianceView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceData.map((item) => (
          <div key={item.name} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{item.name}</h3>
              <div className={`h-3 w-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
            </div>
            <div className="text-3xl font-bold mb-2" style={{ color: item.color }}>{item.value}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Recent Compliance Issues</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div className="flex-1">
              <p className="font-medium">Missing Email Verification</p>
              <p className="text-sm text-gray-600">Agent: Sarah Mitchell • Call ID: #1234</p>
            </div>
            <span className="text-sm text-yellow-600">2h ago</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
            <XCircle className="h-5 w-5 text-red-600" />
            <div className="flex-1">
              <p className="font-medium">Data Protection Violation</p>
              <p className="text-sm text-gray-600">Agent: Mike Johnson • Call ID: #5678</p>
            </div>
            <span className="text-sm text-red-600">4h ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CallSense QA</h1>
                <p className="text-sm text-gray-600">Intelligent Quality Assurance Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-8 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'calls', label: 'Call Analysis', icon: Phone },
            { id: 'training', label: 'Training', icon: BookOpen },
            { id: 'compliance', label: 'Compliance', icon: CheckCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {selectedTab === 'dashboard' && <DashboardView />}
        {selectedTab === 'calls' && <CallAnalysisView />}
        {selectedTab === 'training' && <TrainingView />}
        {selectedTab === 'compliance' && <ComplianceView />}
      </div>

      {selectedCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Call Transcript</h2>
                  <p className="text-gray-600">{selectedCall.customer} • {selectedCall.agent}</p>
                </div>
                <button
                  onClick={() => setSelectedCall(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {selectedCall.transcript}
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-pink-600">{selectedCall.metrics.empathy}</div>
                    <div className="text-xs text-gray-500">Empathy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{selectedCall.metrics.accuracy}</div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{selectedCall.metrics.resolution}</div>
                    <div className="text-xs text-gray-500">Resolution</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{selectedCall.metrics.compliance}</div>
                    <div className="text-xs text-gray-500">Compliance</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCall(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallSenseQA;