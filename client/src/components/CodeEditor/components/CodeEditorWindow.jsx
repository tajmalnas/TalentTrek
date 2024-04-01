import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditorWindow = ({ onChange, language, code, theme, id }) => {
  const [value, setValue] = useState(code || "");
  
  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };



  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorWindow;
