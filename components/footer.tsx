import Link from "next/link";
import { StudentCouncilSVG } from "./svg/student-council-svg";
import { Mail, MapPin, Clock, Instagram, Github } from "lucide-react";
import { Highlighter } from "./ui/highlighter";

interface FooterProps {
  navLinks: Array<{ link: string; label: string }>;
}

export function Footer({ navLinks }: FooterProps) {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <StudentCouncilSVG />
            </Link>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
              Student Council
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Representing the {" "}
                <Highlighter action="underline" color="#F37272">
                  {" "}voice of the students{" "}
                </Highlighter>{" "}
             <br/>at the IT University of Copenhagen.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-neutral-600 dark:text-neutral-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:board@studentcouncil.dk"
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors break-all"
                >
                  board@studentcouncil.dk
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-neutral-600 dark:text-neutral-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Office 4a10<br />
                  Rued Langgaards Vej 7<br />
                  2300 Copenhagen S
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-neutral-600 dark:text-neutral-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Office Hours:<br />
                  Mon-Fri: 9:00 - 17:00
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links & Legal */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="https://www.instagram.com/studentcouncilitu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/itustudentcouncil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
            
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">
              Other
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://public.3.basecamp.com/p/CeYkRHjTz6vH83Y93Q1dsyaB/vault"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Insights
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
              © {new Date().getFullYear()} Student Council ITU. All rights reserved.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center sm:text-right">
              Made with ❤️ by students, for students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
