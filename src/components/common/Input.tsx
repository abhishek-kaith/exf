import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  label,
  name,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mb-4">
      <label htmlFor={name} className="leading-7 dark:text-gray-200">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 w-full rounded border border-gray-300 bg-transparent bg-white py-1 px-3 text-lg leading-8  outline-none transition-colors duration-200 ease-in-out focus:border-none  focus:ring-2 focus:ring-brand dark:border-gray-700"
        {...register(name)}
      />
      {errors[name] && (
        <span className="block pt-1 text-xs text-red-500">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};
export default FormInput;
