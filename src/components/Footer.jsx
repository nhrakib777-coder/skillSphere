import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <h2 className="text-xl font-bold">SkillSphere</h2>
        <p>Learn new skills from industry experts</p>
        <p>Contact: support@skillsphere.com</p>
      </div>
      <div>
        <h2 className="footer-title">Legal</h2>
        <Link href="/" className="link">Terms</Link>
        <Link href="/" className="link">Privacy</Link>
      </div>
    </footer>
  );
};
export default Footer;