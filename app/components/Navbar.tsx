import Link from "next/link";
import {
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop shadow-xl z-10">
      <div className="prose prose-xl mx-auto flex  justify-between flex-col sm:flex-row">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link
            href="/"
            className="text-white/90 no-underline hover:text-white"
          >
            {" "}
            Stanley Nwaiwu
          </Link>
        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
          <Link
            className="text-white/90 no-underline hover:text-white"
            href="https://www.linkedin.com/in/stanley-nwaiwu-23414a1a0/"
          >
            <FaLinkedin />
          </Link>
          <Link
            className="text-white/90 no-underline hover:text-white"
            href="https://github.com/STANLOO442"
          >
            <FaGithub />
          </Link>
          <Link
            className="text-white/90 no-underline hover:text-white"
            href="https://web.facebook.com/profile.php?id=100078125265117"
          >
            <FaFacebook />
          </Link>
          <Link
            className="text-white/90 no-underline hover:text-white"
            href="https://twitter.com/StanleyNwaNwa"
          >
            <FaTwitter />
          </Link>
          <Link
            className="text-white/90 no-underline hover:text-white"
            href="https://www.instagram.com/stanley_nwa_nwa/"
          >
            <FaInstagram />
          </Link>
        </div>
      </div>
    </nav>
  );
}
