import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const serverurl = import.meta.env.VITE_API_URL
const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const {user, getAccessTokenSilently} = useAuth0()
  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, 'g'); // default: global match
      const matches = [...testString.matchAll(regex)];
      if (matches.length > 0) {
        setResult(matches.map(m => m[0]));
      } else {
        setResult([]);
      }
      setError('');
    } catch (err) {
      setError('Invalid Regular Expression');
      setResult(null);
    }
  };


  async function TrackClick(){
    const task = 'regex'
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
      <h2 className="text-2xl font-bold mb-4">🔍 Regex Tester</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Regex Pattern</label>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="e.g. \d+"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Test String</label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded font-mono"
          placeholder="Paste text here to test against regex..."
        />
      </div>

      <button
        onClick={() => {
          testRegex();
          TrackClick();
        }}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Test Regex
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {result && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-2">Matches:</h4>
          {result.length > 0 ? (
            <ul className="list-disc pl-5 text-green-700">
              {result.map((match, index) => (
                <li key={index}>{match}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No matches found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RegexTester;
