import type { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  id: string;
  label: React.ReactNode;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  transform?: (value: string) => string;
  as?: "input" | "textarea";
};

// Combina os atributos nativos dependendo do tipo de tag escolhida
type FormFieldProps = BaseProps & 
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value">;

export default function FormField({
  id,
  label,
  value,
  error,
  onChange,
  transform,
  as = "input",
  className = "",
  ...props
}: FormFieldProps) {
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawValue = e.target.value;
    onChange(transform ? transform(rawValue) : rawValue);
  };

  const commonClasses = `
    w-full rounded-xl border-2 px-4 py-3 text-base
    shadow-sm outline-none transition-all duration-200
    focus:border-indigo-500 focus:ring-4
    focus:ring-indigo-100
    placeholder:text-gray-400
    ${
      error
        ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-100"
        : "border-gray-200 bg-gray-50/50 focus:bg-white"
    }
    ${className}
  `;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={id}
        className="
          px-0.5 text-xs font-semibold
          uppercase tracking-wider text-gray-600
          flex items-center gap-2
        "
      >
        {label}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          value={value as string}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${commonClasses} resize-none`}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          value={value as string}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={commonClasses}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

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