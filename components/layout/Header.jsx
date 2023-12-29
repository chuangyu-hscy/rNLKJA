import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  // Both headers are rendered, but CSS controls which one is displayed based on screen size
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};

export default Header;

export const DesktopHeader = () => {
  return (
    // Only display this div on medium screens and larger
    <div className="hidden md:flex justify-between items-center py-10 px-4">
      <Link className="flex flex-row items-center" href="/">
        <Image src="/logo.svg" alt="Logo" width={80} height={80} quality={75} />
        <span className="ml-2 font-bold">rNLKJA</span>
      </Link>

      <nav className="space-x-4">
        <Link className="px-2 mr-4" href="/about-me">
          About Me
        </Link>
        <Link className="px-2 mr-4" href="/projects">
          Projects
        </Link>
        <Link className="px-2 mr-4" href="/blogs">
          Blogs
        </Link>
        <Link className="px-2 mr-4" href="/contact">
          Contact
        </Link>
      </nav>
    </div>
  );
};

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Always display this div, but its contents are controlled by isOpen
    <div className="md:hidden flex justify-between items-center p-4">
      <Link className="flex flex-row items-center" href="/">
        <Image src="/logo.svg" alt="Logo" width={80} height={80} quality={75} />
        <span className="ml-2 font-bold">rNLKJA</span>
      </Link>

      <button onClick={toggleDropdown} className="px-2">
        Menu
      </button>
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white shadow-md z-10">
          <Link className="block px-4 py-2" href="/about-me">
            About Me
          </Link>
          <Link className="block px-4 py-2" href="/projects">
            Projects
          </Link>
          <Link className="block px-4 py-2" href="/blogs">
            Blogs
          </Link>
          <Link className="block px-4 py-2" href="/contact">
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};