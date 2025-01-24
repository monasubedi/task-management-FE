import React, { useState } from "react";

const useInput = (value?: string) => {
  const [inputValue, setInputValue] = useState<string | undefined>(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    inputValue,
    handleInputChange,
  };
};

export default useInput;
