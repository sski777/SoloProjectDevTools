import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react';
const serverurl = import.meta.env.VITE_API_URL
const UuidGenerator = () => {
  const [uuid, setUuid] = useState('');
  const {user, getAccessTokenSilently} = useAuth0()
  const generateUuid = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
  };

  const copyToClipboard = () => {
    if (!uuid) return;
    navigator.clipboard.writeText(uuid);
    alert('UUID copied to clipboard!');
  };


  async function TrackClick(){
    const task = 'uuidgenerator'
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
      <h2 className="text-2xl font-bold mb-4">🔑 UUID Generator</h2>

      <button
        onClick={() => {
         generateUuid();
         TrackClick();
        }}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 mb-4"
      >
        Generate UUID
      </button>

      {uuid && (
        <div className="flex items-center gap-4">
          <code className="p-3 bg-gray-100 rounded border border-gray-300 overflow-auto break-all">
            {uuid}
          </code>
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default UuidGenerator;
