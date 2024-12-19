import React, { ChangeEvent, useRef, useState } from "react";
import { Field } from "formik"; // Importamos Field de Formik
import { StyledInputContainer } from "./InputContainer";
import { StyledInputTitle } from "./InputTitle";
import { StyledInputElement } from "./StyledInputElement";

interface InputWithLabelProps {
  title: string;
  type?: "password" | "text";
  name: string; // 'name' debe ser obligatorio para que funcione el Field
  placeholder: string;
  required: boolean;
  error?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
}

const LabeledInput = ({
                        title,
                        placeholder,
                        required,
                        error,
                        onChange,
                        type = "text",
                        name,
                        classname
                      }: InputWithLabelProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <StyledInputContainer
      className={`${error ? "error" : ""}`}
      onClick={handleClick}
    >
      <StyledInputTitle
        className={`${focus ? "active-label" : ""} ${error ? "error" : ""}`}
      >
        {title}
      </StyledInputTitle>
      <StyledInputElement
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // onChange={onChange}
        // className={error ? "error" : ""}
        className={classname}
        ref={inputRef}
      />
    </StyledInputContainer>
  );
};

export default LabeledInput;
