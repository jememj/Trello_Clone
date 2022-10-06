import React, { useRef, useEffect } from "react";

export default function TextAreaAutoHeight({
  value,
  maxLength,
  height,
  onChange,
  onBlur,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = `${height ?? 0}px`;
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = `${scrollHeight}px`;
  }, [value, height]);

  return (
    <textarea
      ref={textareaRef}
      autoFocus
      type="text"
      className="column-header__input"
      value={value}
      maxLength={maxLength}
      style={{ height }}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={(e) => e.currentTarget.select()}
    />
  );
}
