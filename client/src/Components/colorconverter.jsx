import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const serverurl = import.meta.env.VITE_API_URL
const ColorConverter = () => {
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');
  const [hsl, setHsl] = useState('');
  const [error, setError] = useState('');

  const isValidHex = (hex) => /^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(hex);
  const {user, getAccessTokenSilently} = useAuth0()
  async function TrackClick(){
    const task = 'color'
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

  const convertHex = () => {
    let cleanedHex = hex.replace('#', '');
    if (!isValidHex(hex)) {
      setError('Invalid Hex Code');
      return;
    }
    if (cleanedHex.length === 3) {
      cleanedHex = cleanedHex.split('').map(c => c + c).join('');
    }

    const r = parseInt(cleanedHex.slice(0, 2), 16);
    const g = parseInt(cleanedHex.slice(2, 4), 16);
    const b = parseInt(cleanedHex.slice(4, 6), 16);

    setRgb(`rgb(${r}, ${g}, ${b})`);
    setHsl(rgbToHsl(r, g, b));
    setError('');
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎨 Color Converter</h2>

      <input
        type="text"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        placeholder="Enter Hex (e.g. #ff5733)"
        className="w-full px-3 py-2 border rounded mb-2 font-mono"
      />

      <button
        onClick={() => {
         convertHex();
         TrackClick();
        }}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Convert
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {(rgb || hsl) && (
        <div className="mt-6">
          <div
            className="w-full h-24 rounded mb-4 border border-gray-300"
            style={{ backgroundColor: hex }}
          />
          <p className="font-mono text-gray-700">RGB: {rgb}</p>
          <p className="font-mono text-gray-700">HSL: {hsl}</p>
        </div>
      )}
    </div>
  );
};

export default ColorConverter;
