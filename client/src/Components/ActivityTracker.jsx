import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const serverurl = import.meta.env.VITE_API_URL
function ActiviyTracker(){
  const [token, setToken] = useState(null) 
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const [countjsonformatter, setCountJSONFORMATTER] = useState(0)
  const [regextester, setRegexTester] = useState(0)
  const [base64, setBase64] = useState(0)
  const [jwt, setJWT] = useState(0)
  const [UuidGenerator, setUUIDGENERATOR] = useState(0)
  const [UNIXTimestamp, setUNIXTIMESTAMP] = useState(0)
  const [colorconverter, setColorConverter] = useState(0)

 useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (error) {
        console.error("Failed to get token:", error);
      }
    };

    if (isAuthenticated) fetchToken();
  }, [getAccessTokenSilently, isAuthenticated]);



  useEffect(() => {
   console.log('running') 
   if (!token || !user) return; // ✅ Wait until both are ready 
   const options = {
     method: 'GET',
     headers: {'Authorization':'Bearer '+token}
   }
   fetch(serverurl+'/activity', options)
   .then(response => {
     if (!response.ok){
       throw new Error('Request Could Not Be Processed!') 
     }
     return response.json()    
   })
   .then(data => {
     const filterarray = []
     for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.user_id===user.sub){
          filterarray.push(variable)  
        }
     }
     for (let i = 0; i < filterarray.length; i++){
       let variable = filterarray[i]
       if (variable.tool_name==='unixtimestamp'){
         setUNIXTIMESTAMP(prev => prev + 1)
       }
       else if (variable.tool_name==='uuidgenerator'){
         setUUIDGENERATOR(prev => prev + 1)
       }
       else if (variable.tool_name==='regex'){
         setRegexTester(prev => prev + 1)
       }
       else if (variable.tool_name==='jwtdecoder'){
         setJWT(prev => prev + 1)
       }
       else if (variable.tool_name==='JSONformatter'){
         setCountJSONFORMATTER(prev => prev + 1)
       }
       else if (variable.tool_name==='color'){
         setColorConverter(prev => prev + 1)
       }
       else{
        setBase64(prev => prev + 1)
       }
     }
   })
   .catch(error => {
    alert(error.message)
   })
  }, [token, user])



  return (
  <div className="min-h-screen bg-gray-100 py-10 px-6">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🔍 Tool Usage Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-lg">
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          🧮 JSON Formatter: <span className="font-semibold">{countjsonformatter}</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          🔍 Regex Tester: <span className="font-semibold">{regextester}</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          🔐 Base64 Encoder/Decoder: <span className="font-semibold">{base64}</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          🧾 JWT Decoder: <span className="font-semibold">{jwt}</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          🔑 UUID Generator: <span className="font-semibold">{UuidGenerator}</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          🕒 Unix Timestamp Converter: <span className="font-semibold">{UNIXTimestamp}</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          🎨 Color Converter: <span className="font-semibold">{colorconverter}</span>
        </div>
      </div>
    </div>
  </div>
);



}












export default ActiviyTracker