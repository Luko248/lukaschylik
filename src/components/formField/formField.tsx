import { component$ } from "@builder.io/qwik";
import { FormFieldProps } from "./formField.types";

const FormField = component$<FormFieldProps>((props) => {
  const baseClass =
    "block w-full bg-transparent border-gray-600 border-b-1 px-6 py-16 user-invalid:border-red-500 user-valid:border-green-400";

  const classNames = [baseClass, props.className].filter(Boolean).join(" ");

  return (
    <label>
      {props.label}
      {props.type === "textarea" ? (
        <textarea
          name={props.name}
          value={props.value}
          onInput$={props.onInput$}
          required={props.required}
          class={classNames}
          aria-label={props.label}
          disabled={props.disabled}
          readOnly={props.readOnly}
          rows={5}
        />
      ) : (
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onInput$={props.onInput$}
          required={props.required}
          class={classNames}
          aria-label={props.label}
          disabled={props.disabled}
          readOnly={props.readOnly}
        />
      )}
    </label>
  );
});

export default FormField;
