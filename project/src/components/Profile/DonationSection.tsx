import React, { useState } from 'react';

export const DonationSection = () => {
  const [amount, setAmount] = useState('5');
  const predefinedAmounts = ['5', '10', '25', '50'];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Support My Work</h2>
      <p className="text-gray-600 mb-6">
        Your support helps me continue creating independent games and content.
      </p>
      
      <div className="grid grid-cols-4 gap-3 mb-6">
        {predefinedAmounts.map((value) => (
          <button
            key={value}
            onClick={() => setAmount(value)}
            className={`py-2 px-4 rounded-lg border ${
              amount === value
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            ${value}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Support Now
      </button>
    </div>
  );
}