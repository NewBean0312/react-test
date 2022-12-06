import React, {createContext, useContext} from "react";

const ThemeContext = createContext('pink');

const ContextEx = () => {
    const theme = useContext(ThemeContext);
    const style = {
        width: '100px',
        height:  '100px',
        background: theme
    }
  return (
    <div style={style} />
  );
}

export default ContextEx;
