import Link from "next/link";

export default function page() {
  return (
    <>
      <p>Your registration is complete! Please check your email for a verification link to be log-in</p>
      <Link href={"/login"} className="mt-4 p-4 cursor-pointer rounded-2xl bg-gray-400">
        <button type="button" className="cursor-pointer">Back to Login</button>
      </Link>
    </>
  )
}
