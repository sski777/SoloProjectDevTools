import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const serverurl = import.meta.env.VITE_API_URL
const UnixTimestampTool = () => {
  const [timestamp, setTimestamp] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [convertedDate, setConvertedDate] = useState('');
  const [convertedTimestamp, setConvertedTimestamp] = useState('');
  const {user, getAccessTokenSilently} = useAuth0()
  const convertToDate = () => {
    const parsed = parseInt(timestamp);
    if (!isNaN(parsed)) {
      const date = new Date(parsed * 1000);
      setConvertedDate(date.toUTCString());
    } else {
      setConvertedDate('Invalid timestamp');
    }
  };

  const convertToTimestamp = () => {
    const date = new Date(dateInput);
    if (!isNaN(date.getTime())) {
      setConvertedTimestamp(Math.floor(date.getTime() / 1000).toString());
    } else {
      setConvertedTimestamp('Invalid date');
    }
  };


  async function TrackClick(){
    const task = 'unixtimestamp'
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
      <h2 className="text-2xl font-bold mb-6">⏳ Unix Timestamp Converter</h2>

      <div className="mb-6">
        <label className="block font-medium mb-1">Unix Timestamp → Date</label>
        <input
          type="text"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="w-full px-3 py-2 border rounded font-mono"
          placeholder="e.g. 1692825600"
        />
        <button
          onClick={() => {
            convertToDate();
            TrackClick();
          }}
          className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Convert to Date
        </button>
        {convertedDate && (
          <p className="mt-3 text-gray-700">🕓 Result: {convertedDate}</p>
        )}
      </div>

      <hr className="my-8" />

      <div>
        <label className="block font-medium mb-1">Date → Unix Timestamp</label>
        <input
          type="datetime-local"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={() => {
           convertToTimestamp();
           TrackClick();
          }}
          className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Convert to Timestamp
        </button>
        {convertedTimestamp && (
          <p className="mt-3 text-gray-700">🔢 Result: {convertedTimestamp}</p>
        )}
      </div>
    </div>
  );
};

export default UnixTimestampTool;
