import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

export function CreatePost() {
  const [selectedType, setSelectedType] = useState<'image' | 'video' | 'game'>('image');
  const [resources, setResources] = useState({
    cpu: '1',
    memory: '512',
    storage: '1'
  });

  const calculateCost = () => {
    const cpuCost = parseInt(resources.cpu) * 10;
    const memoryCost = parseInt(resources.memory) * 0.02;
    const storageCost = parseInt(resources.storage) * 0.05;
    return (cpuCost + memoryCost + storageCost).toFixed(2);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      {/* <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Post</h2> */}
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Post Type
          </label>
          <div className="flex space-x-4">
            {(['image', 'video', 'game'] as const).map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full capitalize ${
                  selectedType === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Drag and drop your files here, or click to select
            </p>
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200">
              Select Files
            </button>
          </div>
        </div> */}

        {selectedType === 'game' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Resource Requirements</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CPU Cores
                </label>
                <select
                  value={resources.cpu}
                  onChange={(e) => setResources({ ...resources, cpu: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  {[1, 2, 4, 8].map(cores => (
                    <option key={cores} value={cores}>{cores} Core{cores > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Memory (MB)
                </label>
                <select
                  value={resources.memory}
                  onChange={(e) => setResources({ ...resources, memory: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  {[512, 1024, 2048, 4096].map(mb => (
                    <option key={mb} value={mb}>{mb} MB</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Storage (GB)
                </label>
                <select
                  value={resources.storage}
                  onChange={(e) => setResources({ ...resources, storage: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  {[1, 5, 10, 20].map(gb => (
                    <option key={gb} value={gb}>{gb} GB</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p className="text-purple-700 dark:text-purple-300">
                Estimated cost: ${calculateCost()}/month
              </p>
            </div>
          </div>
        )}

        <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
          Create Post
        </button>
      </div>
    </div>
  );
}