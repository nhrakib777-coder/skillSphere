import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SkillSphere",
  description: "Online Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        {/* ✅ WRAP EVERYTHING HERE */}
        <AuthProvider>

          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />

          {/* ✅ Toast Provider */}
          <Toaster position="top-right" />

        </AuthProvider>

      </body>
    </html>
  );
}