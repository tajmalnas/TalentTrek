export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    color: "#ffffff",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    border: "2px solid #000000",
    ":hover": {
      border: "2px solid #000000",
      boxShadow: "none",
    },
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#fff",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#1e293b",
      ":hover": {
         backgroundColor: "rgb(243 244 246)",
         color: "#000",
         cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#1e293b",
      maxWidth: "14rem",
      border: "2px solid #000000",
      borderRadius: "5px",
    };
  },

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
