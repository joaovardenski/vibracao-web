import type { ChangeEvent, InputHTMLAttributes } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  transform?: (value: string) => string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

export default function FormField({
  id,
  label,
  value,
  error,
  onChange,
  transform,
  ...props
}: FormFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    onChange(transform ? transform(rawValue) : rawValue);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="
          px-0.5 text-xs font-semibold
          uppercase tracking-wider text-gray-600
        "
      >
        {label}
      </label>

      <input
        id={id}
        value={value}
        onChange={handleChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          rounded-xl border-2 px-4 py-3 text-base
          shadow-sm outline-none transition-all duration-200
          focus:border-indigo-500 focus:ring-4
          focus:ring-indigo-100
          placeholder:text-gray-400
          ${
            error
              ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-100"
              : "border-gray-200 bg-gray-50/50"
          }
        `}
        {...props}
      />

      {error && (
        <span
          id={`${id}-error`}
          className="
            mt-0.5 flex items-center gap-1
            px-0.5 text-xs font-medium text-red-500
          "
        >
          ⚠️ {error}
        </span>
      )}
    </div>
  );
}
