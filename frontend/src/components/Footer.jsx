import { Github, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-300 border-t border-base-content/10  bottom-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-6 text-center text">
        <p className="mb-3 text-2xl">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold hover:text-primary transition text-2xl">Suraj Suthar</span>
        </p>

        <div className="flex justify-center gap-20">
          <a
            href="https://github.com/Surajsuthar01"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/suraj-suthar-7a088a28b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition"
          >
            <Linkedin className="h-5 w-5" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://suraj-suthar.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary transition"
          >
            <Globe className="h-5 w-5" />
            <span>Website</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
