import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center rounded-lg px-4">
      <div className="card w-full max-w-md bg-base-100 rounded-lg shadow-xl p-6">
        <div className="card-body  ">

          <h2 className="text-2xl font-bold text-center">
            Login to SkillSphere
          </h2>

          <p className="text-center text-gray-500 text-sm">
            Access your courses and continue learning
          </p>

          <Suspense fallback={<p className="text-center">Loading...</p>}>
            <LoginForm />
          </Suspense>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-primary font-medium">
              Register
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}