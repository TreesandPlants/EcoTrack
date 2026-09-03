import { FcGoogle } from "react-icons/fc";

export default function SocialLoginButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
w-full
h-14

border

rounded-xl

flex
items-center
justify-center
gap-3

hover:bg-gray-50
transition

font-medium
"
    >
      <FcGoogle size={26} />

      Continue with Google

    </button>
  );
}