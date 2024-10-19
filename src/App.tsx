import React, { useState } from 'react';
import { Database, BarChart3, Workflow } from 'lucide-react';
import SetupWizard from './components/SetupWizard';

const services = [
  {
    name: 'Apache Superset',
    description: 'Modern data exploration and visualization platform',
    icon: BarChart3,
    url: 'http://localhost:8088',
  },
  {
    name: 'PostgreSQL',
    description: 'Powerful, open source object-relational database system',
    icon: Database,
    url: 'http://localhost:5432',
  },
  {
    name: 'n8n',
    description: 'Workflow automation tool for both technical and non-technical people',
    icon: Workflow,
    url: 'http://localhost:5678',
  },
];

function App() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Superset, PostgreSQL, and n8n Integration
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <service.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      {service.name}
                    </h2>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
                <div className="mt-6">
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Open {service.name}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mb-12">
          <button
            onClick={() => setShowWizard(!showWizard)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showWizard ? 'Hide Setup Wizard' : 'Show Setup Wizard'}
          </button>
        </div>
        {showWizard && <SetupWizard />}
      </div>
    </div>
  );
}

export default App;