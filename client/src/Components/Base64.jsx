import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const serverurl = import.meta.env.VITE_API_URL
const Base64Tool = () => {
  const [mode, setMode] = useState('encode'); // or 'decode'
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const {user, getAccessTokenSilently} = useAuth0()
  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(input);
        setOutput(encoded);
      } else {
        const decoded = atob(input);
        setOutput(decoded);
      }
      setError('');
    } catch (err) {
      setError('Invalid input for decoding.');
      setOutput('');
    }
  };


    async function TrackClick(){
    const task = 'base64'
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
      <h2 className="text-2xl font-bold mb-4">🔐 Base64 Encoder / Decoder</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="px-3 py-2 border rounded w-full"
        >
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}
        className="w-full h-32 p-3 border border-gray-300 rounded mb-4 font-mono"
      />

      <button
        onClick={() => {
          handleConvert();
          TrackClick();
        }}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        {mode === 'encode' ? 'Encode' : 'Decode'}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {output && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-2">Result:</h4>
          <pre className="bg-gray-100 p-4 rounded border border-gray-300 overflow-auto">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default Base64Tool;
