// src/Editor.jsx
import JoditEditor from "jodit-react";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
const Editor = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  useEffect(() => {
    if (editor.current && editor.current.editor) {
      const editorInstance = editor.current.editor;

      // Set the height of the editor to 100vh
      editorInstance.container.style.height = "100vh";

      // Inject custom CSS for placeholder
      const style = document.createElement("style");
      style.textContent = `
        .jodit-editor .jodit-placeholder {
          color: #452;
          font-style: italic;
        }
      `;
      editorInstance.container.appendChild(style);
    }
  }, [editor]);

  return (
    <div
      className="container"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: "0",
        margin: "0",
        boxSizing: "border-box", // Ensure padding is included in height
      }}
    >
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onChange={(newContent) => setContent(newContent)}
        style={{
          width: "100%",
          height: "100%", // Make sure the editor takes up the full height of the container
          border: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export default Editor;
