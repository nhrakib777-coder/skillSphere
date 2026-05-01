import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">404 - Page Not Found</h2>
      <Link href="/" className="btn btn-primary mt-4">Go Home</Link>
    </div>
  );
}