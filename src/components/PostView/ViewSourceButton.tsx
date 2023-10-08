import React, { useState } from 'react'

const SourceIcon = () => (
  <div title="View Source" className="ml-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2.5 24 24"
      width="16"
      fill="currentColor"
    >
      <path d="M3 0h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm2 1h6a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2zm0 12h2a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm0-4h6a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm0-4h6a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2z"></path>
    </svg>
  </div>
)

const MarkDownIcon = () => (
  <div title="View Markdown" className="ml-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2.5 24 24"
      width="16"
      fill="currentColor"
    >
      <path d="M3 0h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm1 7a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2H4zm0 8a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2H4zM4 3a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2H4zm0 8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2H4z"></path>
    </svg>
  </div>
)

// Type that describes the props of ViewSourceButton Component
type ViewSourceButtonProps = {
  onToggle: (toggled: boolean) => void // function prop that takes a boolean argument and doesn't return anything
}

// ViewSourceButtonProps is used as a generic parameter to the React.FC type, which describes the functional component
const ViewSourceButton: React.FC<ViewSourceButtonProps> = ({ onToggle }) => {
  const [isToggled, setIsToggled] = useState(false)

  const handleClick = () => {
    setIsToggled(!isToggled)
    onToggle(!isToggled)
  }

  return (
    <button onClick={handleClick}>
      {isToggled ? <MarkDownIcon /> : <SourceIcon />}
    </button>
  )
}

export default ViewSourceButton
