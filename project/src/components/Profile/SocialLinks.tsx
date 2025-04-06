import React from 'react';

export const SocialLinks = () => {
  const links = [
    { platform: 'GitHub', url: 'https://github.com', icon: 'fa-github' },
    { platform: 'Twitter', url: 'https://twitter.com', icon: 'fa-twitter' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'fa-linkedin' },
    { platform: 'Itch.io', url: 'https://itch.io', icon: 'fa-gamepad' },
  ];

  return (
    <div className="h-full w-full bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Connect</h2>
      <div className="grid grid-cols-2 gap-4">
        {links.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i className={`fab ${link.icon} text-xl text-gray-600`}></i>
            <span className="text-gray-700">{link.platform}</span>
          </a>
        ))}
      </div>
    </div>
  );
}