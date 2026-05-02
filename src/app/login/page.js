import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 rounded-xl">

        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Login to SkillSphere
          </h2>

          <p className="text-center text-gray-500 text-sm mt-1">
            Access your courses and continue learning
          </p>

          {/* LOGIN FORM */}
          <div className="mt-6">
            <LoginForm />
          </div>

          {/* REGISTER LINK */}
          <p className="text-sm text-center mt-6">
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