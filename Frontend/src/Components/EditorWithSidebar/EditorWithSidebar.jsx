import Editor from "@monaco-editor/react";

const EditorWithSidebar = ({
  roomId,
  userName,       // Current user's name
  language,
  code,
  users,           // List of all connected users
  typing,
  onCodeChange,
  onLanguageChange,
  onLeave,
  copyRoomId,
  copySuccess,
  onRunCode,
  output,
  suggestion,
  onGenerateSuggestion
}) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Code Room: {roomId}</h2>
          <p className="text-sm text-gray-400 mt-1">
            Logged in as: <span className="text-blue-400">{userName}</span>
          </p>

          <button
            onClick={copyRoomId}
            className="mt-2 bg-green-500 hover:bg-green-600 p-2 rounded w-full"
          >
            Copy Room ID
          </button>
          {copySuccess && <p className="text-green-400 text-sm mt-1">{copySuccess}</p>}
        </div>

        <h3 className="text-md font-medium">Users in Room:</h3>
        <ul className="mb-4">
          {users.map((user, index) => (
            <li key={index} className={user === userName ? "text-blue-300 font-bold" : ""}>
              {user.slice(0, 8)}{user === userName && " (You)"}
            </li>
          ))}
        </ul>

        <p className="italic text-yellow-400 text-sm mb-2">{typing}</p>

        <select
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={language}
          onChange={onLanguageChange}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>

        <button
          onClick={onLeave}
          className="w-full mt-4 bg-red-500 hover:bg-red-600 p-2 rounded"
        >
          Leave Room
        </button>

        <button
          onClick={onRunCode}
          className="mt-4 bg-blue-500 hover:bg-blue-600 p-2 rounded w-full"
        >
          Run code
        </button>
        <button
          onClick={onGenerateSuggestion}
          className="mt-2 bg-purple-500 hover:bg-purple-600 p-2 rounded w-full"
        >
          Generate Suggestion
        </button>
      </div>

      {/* Editor Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 relative">
          <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            value={code}
            onChange={onCodeChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
            }}
          />
          
          {/* Suggestion Box */}
          {suggestion && (
            <div className="absolute top-4 right-4 bg-gray-700 text-white p-3 rounded shadow-lg w-96 h-96 overflow-y-auto">
              <p className="text-sm font-semibold">💡 AI Suggestion:</p>
              <pre className="whitespace-pre-wrap text-sm">{suggestion}</pre>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div 
          className="output-container p-4 mt-4 bg-black-800 text-white"
          style={{
            minHeight: `300px`,
            maxHeight: `500px`,
            overflowY: "auto"
          }}
        >
          <h4 className="text-lg font-bold mb-2">Output:</h4>
          <pre className="whitespace-pre-wrap break-words">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default EditorWithSidebar;
