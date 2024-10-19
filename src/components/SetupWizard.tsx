import React, { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Deploy Apache Superset',
    instructions: [
      { text: 'Our server is pre-configured to deploy Apache Superset. Click the button below to start the deployment process.' }
    ]
  },
  {
    title: 'Configure Connection',
    instructions: [
      { text: 'The connection details for your Superset instance will be automatically filled after deployment.' }
    ]
  },
  {
    title: 'Test Connection',
    instructions: [
      { text: 'Test the connection to your Superset instance.' }
    ]
  }
];

const SetupWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [deploymentStatus, setDeploymentStatus] = useState<string>('');
  const [connectionDetails, setConnectionDetails] = useState({
    host: '',
    port: '',
    username: '',
    password: ''
  });
  const [connectionStatus, setConnectionStatus] = useState<string>('');

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepCompletion = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };

  const handleDeploy = async () => {
    setDeploymentStatus('Deploying...');
    // Simulating deployment process
    setTimeout(() => {
      setDeploymentStatus('Deployed successfully!');
      // Auto-fill connection details after successful deployment
      setConnectionDetails({
        host: 'localhost',
        port: '8088',
        username: 'admin',
        password: 'admin'
      });
      handleStepCompletion();
      handleNextStep(); // Automatically move to the next step
    }, 3000);
  };

  const handleTestConnection = async () => {
    setConnectionStatus('Testing connection...');
    // Simulating connection test
    setTimeout(() => {
      setConnectionStatus('Connected successfully!');
      handleStepCompletion();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 p-6 bg-gray-100">Superset Setup Wizard</h2>
      <div className="p-6">
        <div className="flex items-center mb-6">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {completedSteps.includes(index) ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <h3 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h3>
        <div className="space-y-4">
          {currentStep === 0 && (
            <div>
              <p>{steps[currentStep].instructions[0].text}</p>
              <button
                onClick={handleDeploy}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Deploy Superset
              </button>
              {deploymentStatus && <p className="mt-2 text-green-600">{deploymentStatus}</p>}
            </div>
          )}
          {currentStep === 1 && (
            <div className="space-y-4">
              <p>{steps[currentStep].instructions[0].text}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Host</label>
                  <input
                    type="text"
                    name="host"
                    value={connectionDetails.host}
                    readOnly
                    className="mt-1 block w-full p-2 border rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Port</label>
                  <input
                    type="text"
                    name="port"
                    value={connectionDetails.port}
                    readOnly
                    className="mt-1 block w-full p-2 border rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={connectionDetails.username}
                    readOnly
                    className="mt-1 block w-full p-2 border rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={connectionDetails.password}
                    readOnly
                    className="mt-1 block w-full p-2 border rounded bg-gray-100"
                  />
                </div>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <p>{steps[currentStep].instructions[0].text}</p>
              <button
                onClick={handleTestConnection}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Test Connection
              </button>
              {connectionStatus && <p className="mt-2 text-green-600">{connectionStatus}</p>}
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded ${
              currentStep === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <div>
            <button
              onClick={handleStepCompletion}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 mr-2"
            >
              Mark as Completed
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStep === steps.length - 1}
              className={`px-4 py-2 rounded ${
                currentStep === steps.length - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;