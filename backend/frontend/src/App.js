import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit');
        return;
      }
      
      setError(null);
      setImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    formData.append('file', fileInput.files[0]);

    try {
      const response = await fetch('http://localhost:8001/identify', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      setResult(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to identify celebrity. Please try again. Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setError(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-4 relative overflow-hidden" 
         style={{ backgroundImage: "url('./sports_background.jpg')" }}>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-blue-200 opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 rounded-full bg-purple-200 opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-indigo-200 opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-300 opacity-10 animate-pulse delay-1500"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 rounded-full bg-blue-300 opacity-30 animate-pulse delay-300"></div>
        <div className="absolute top-20 right-1/3 w-16 h-16 rounded-full bg-indigo-300 opacity-20 animate-pulse delay-1200"></div>
      </div>
      
      {/* Floating sports icons */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 text-blue-300 opacity-70 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 right-1/4 w-6 h-6 text-purple-300 opacity-70 animate-bounce delay-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl overflow-hidden relative z-10 backdrop-blur-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="grid grid-cols-4 gap-4 p-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-white"></div>
              ))}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white relative z-10">Sports Celebrity Identifier</h1>
          <p className="text-blue-100 mt-1 relative z-10">Upload a sports image to identify the athlete</p>
        </div>
        
        {/* Main Content */}
        <div className="p-6">
          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="image">
              Upload Sports Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 group-hover:text-blue-500 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 group-hover:text-blue-600 transition-colors"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                </div>
                <input 
                  id="image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </label>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* Image Preview */}
          {image && (
            <div className="mb-6">
              <div className="relative">
                <img 
                  src={image} 
                  alt="Preview" 
                  className="w-full h-64 object-contain rounded-lg border border-gray-200 shadow-sm"
                />
                <button 
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                    setError(null);
                    const fileInput = document.querySelector('input[type="file"]');
                    if (fileInput) fileInput.value = '';
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              disabled={!image || loading}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-all ${
                !image || loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </div>
              ) : (
                'Identify Celebrity'
              )}
            </button>
            
            <button
              onClick={handleReset}
              className="py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors shadow-sm"
            >
              Reset
            </button>
          </div>

          {/* Results Section */}
          {result && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="grid grid-cols-5 gap-2 p-2">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-green-500"></div>
                  ))}
                </div>
              </div>
              <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center relative z-10">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Identification Result
              </h2>
              <div className="space-y-2 relative z-10">
                <p className="text-green-700">
                  <span className="font-medium">Celebrity:</span> <span className="text-lg font-bold">{result.celebrity}</span>
                </p>
                <div className="flex items-center">
                  <span className="text-green-700 font-medium">Confidence:</span>
                  <div className="ml-2 flex-1 bg-green-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${result.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-green-700 font-medium">{(result.confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Supports identification of Ronaldo, Virat, and Hritik based on reference images</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;