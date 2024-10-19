import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const steps = [
  {
    title: 'Install Apache Superset',
    content: `
1. Pull the Superset Docker image:
   \`\`\`
   docker pull apache/superset
   \`\`\`
2. Run Superset container:
   \`\`\`
   docker run -d -p 8088:8088 --name superset apache/superset
   \`\`\`
3. Initialize Superset:
   \`\`\`
   docker exec -it superset superset-init
   \`\`\`
    `
  },
  {
    title: 'Install and Set Up PostgreSQL',
    content: `
1. Pull the PostgreSQL Docker image:
   \`\`\`
   docker pull postgres
   \`\`\`
2. Run PostgreSQL container:
   \`\`\`
   docker run -d --name postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 postgres
   \`\`\`
3. Create a new database:
   \`\`\`
   docker exec -it postgres psql -U postgres -c "CREATE DATABASE superset;"
   \`\`\`
    `
  },
  {
    title: 'Configure Superset to Connect to PostgreSQL',
    content: `
1. Install PostgreSQL adapter for Superset:
   \`\`\`
   docker exec -it superset pip install psycopg2-binary
   \`\`\`
2. Modify Superset configuration:
   \`\`\`
   docker exec -it superset bash
   echo "SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:yourpassword@host.docker.internal:5432/superset'" >> superset_config.py
   exit
   \`\`\`
3. Restart Superset to apply changes:
   \`\`\`
   docker restart superset
   \`\`\`
    `
  }
];

const SetupGuide: React.FC = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 p-6 bg-gray-100">Setup Guide</h2>
      <div className="divide-y divide-gray-200">
        {steps.map((step, index) => (
          <div key={index} className="p-6">
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() => toggleStep(index)}
            >
              <span className="text-lg font-medium text-gray-900">{step.title}</span>
              {openStep === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {openStep === index && (
              <div className="mt-4 prose prose-sm max-w-none">
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{step.content}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetupGuide;