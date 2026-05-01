import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SkillSphere - Learn Skills Online",
  description: "Modern Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}