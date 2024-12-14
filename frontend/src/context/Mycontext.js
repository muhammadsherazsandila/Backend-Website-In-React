import React, { createContext, useState } from 'react';

// Create a Context
const MyContext = createContext();

// Create a provider component to share the context value
const MyProvider = ({ children }) => {
  const [state, setState] = useState(false); // Shared state

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
