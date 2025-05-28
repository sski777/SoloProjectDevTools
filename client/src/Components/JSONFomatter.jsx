import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const serverurl = import.meta.env.VITE_API_URL
const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const {user, getAccessTokenSilently} = useAuth0()
  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2); // 2-space indent
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid JSON. Please check your input.');
      setOutput('');
    }
  };

  async function TrackClick(){
    const task = 'JSONformatter'
    const token = await getAccessTokenSilently();
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json','Authorization':'Bearer '+token},
      body: JSON.stringify({task:task,userid:user.sub})
    }
    fetch(serverurl+'/activity', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      else{
        return response
      }
    })
    .catch(error => {
      alert(error.message)
    })
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧩 JSON Formatter</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste raw JSON here..."
        className="w-full h-48 p-3 border border-gray-300 rounded mb-4 font-mono"
      />

      <button
        onClick={() => {
         formatJson();
         TrackClick();
        }}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Format
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {output && (
        <pre className="mt-6 p-4 bg-gray-100 rounded overflow-auto border border-gray-300">
          {output}
        </pre>
      )}
    </div>
  );
};

export default JsonFormatter;
