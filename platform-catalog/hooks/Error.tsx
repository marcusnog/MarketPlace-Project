import React, { createContext, useState } from "react";

export const ErrorContext = createContext({
  error: ``,
  setError: (() => {}) as any,
});

export const ErorTest = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState("");

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {!!error && <p>{error}</p>}
      {children}
    </ErrorContext.Provider>
  );
};
