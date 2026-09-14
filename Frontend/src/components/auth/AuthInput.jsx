export default function AuthInput({
  label,
  type = "text",
  ...props
}) {
  return (
    <div className="mb-5">

      <label className="block mb-2 font-medium text-gray-700">

        {label}

      </label>

      <input
        type={type}
        {...props}
        className="
w-full
h-14

rounded-xl

border

px-5

outline-none

focus:ring-2
focus:ring-green-500
transition
"
      />

    </div>
  );
}