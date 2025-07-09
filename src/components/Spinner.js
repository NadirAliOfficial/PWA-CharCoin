const Spinner = ({ text, color="white" }) => {
  const spinnerStyle = {
    border: "2px solidr rgb(9, 36, 240)", // Light grey
    borderTop: "2px solid rgb(13, 141, 232)", // Blue
    borderRadius: "50%",
    width: "25px",
    marginRight:"8px",
    height: "25px",
    animation: "spin 0.5s linear infinite",
  };

  
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
      <div style={spinnerStyle}></div>
      <div style={{fontWeight:"bold", color:"white"}}>{text}</div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;