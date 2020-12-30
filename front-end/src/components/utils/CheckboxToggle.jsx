import React from "react";

const CheckboxToggle = ({ label, checked, onChange, ...props }) => {
  return (
    <label className="filter-label flex justify-start items-start mt-2">
      <div className="filter-input px-0 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
        <input
          type="checkbox"
          className="opacity-0 absolute"
          checked={checked || false}
          onChange={onChange}
        />
        {checked && (
          <svg className="fill-current w-4 h-4 block text-blue-500 pointer-events-none" viewBox="0 0 20 20">
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>
      <div className="select-none sm:text-base md:text-xl font-semibold">{label}</div>
    </label>
  );
};
export default CheckboxToggle;
