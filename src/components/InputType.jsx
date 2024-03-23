import React from "react";

const InputType = ({
  labelTitle,
  id,
  inputType = "text",
  name,
  value,
  onChange,
  ...props
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelTitle}
      </label>
      <input
        type={inputType}
        className="form-control"
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        {...props}
      />
    </>
  );
};

export default InputType;
