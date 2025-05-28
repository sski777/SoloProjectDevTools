import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const serverurl = import.meta.env.VITE_API_URL
const JwtDecoder = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');
  const {user, getAccessTokenSilently} = useAuth0()
  const decodeJwt = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT');

      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = JSON.parse(atob(parts[1]));

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError('');
    } catch (err) {
      setHeader(null);
      setPayload(null);
      setError('Invalid JWT token. Make sure it has 3 parts and is properly encoded.');
    }
  };


  async function TrackClick(){
    const task = 'jwtdecoder'
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
      <h2 className="text-2xl font-bold mb-4">🔓 JWT Decoder</h2>

      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste your JWT here..."
        className="w-full h-32 p-3 border border-gray-300 rounded mb-4 font-mono"
      />

      <button
        onClick={() => {
         decodeJwt();
         TrackClick();
        }}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Decode Token
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {header && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-1">Header:</h4>
          <pre className="bg-gray-100 p-4 rounded border border-gray-300 overflow-auto">{JSON.stringify(header, null, 2)}</pre>
        </div>
      )}

      {payload && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-1">Payload:</h4>
          <pre className="bg-gray-100 p-4 rounded border border-gray-300 overflow-auto">{JSON.stringify(payload, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JwtDecoder;
