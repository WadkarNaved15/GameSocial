import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSnippetProps {
  code: string;
  language: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <span className="text-gray-400 text-sm">{language}</span>
        <button 
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <i className="far fa-copy"></i>
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          borderRadius: '0 0 0.5rem 0.5rem'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};