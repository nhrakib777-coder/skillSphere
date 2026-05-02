import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16">
      
      <div className="container mx-auto px-6 py-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-primary">SkillSphere</h2>
          <p className="mt-3 text-sm text-gray-500">
            Upgrade your skills with industry expert-led courses. Learn anytime, anywhere.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            📧 support@skillsphere.com
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="footer-title">Explore</h3>
          <ul className="space-y-2 mt-3">
            <li><Link href="/" className="link link-hover">Home</Link></li>
            <li><Link href="/courses" className="link link-hover">Courses</Link></li>
            <li><Link href="/profile" className="link link-hover">My Profile</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="footer-title">Resources</h3>
          <ul className="space-y-2 mt-3">
            <li><Link href="/" className="link link-hover">Blog</Link></li>
            <li><Link href="/" className="link link-hover">Learning Tips</Link></li>
            <li><Link href="/" className="link link-hover">Help Center</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="footer-title">Legal</h3>
          <ul className="space-y-2 mt-3">
            <li><Link href="/" className="link link-hover">Terms & Conditions</Link></li>
            <li><Link href="/" className="link link-hover">Privacy Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">

          <p>© {new Date().getFullYear()} SkillSphere. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition">Facebook</a>
            <a href="#" className="hover:text-primary transition">Twitter</a>
            <a href="#" className="hover:text-primary transition">LinkedIn</a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;