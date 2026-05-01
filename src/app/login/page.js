import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <Suspense fallback={<p>Loading...</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}