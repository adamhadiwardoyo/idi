'use client';

import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive, onClick }) => {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick();
    if (href.startsWith('/#')) {
      // If we are already on the homepage, scroll smoothly
      if (pathname === '/') {
        e.preventDefault();
        const targetId = href.substring(2);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // If on a different page, the i18n-aware <Link> will handle navigation
      // to the correct locale's homepage before the browser jumps to the anchor.
    }
  };

  return (
    <li>
      <Link
        href={href}
        onClick={handleClick}
        className={`relative text-white font-medium transition-colors duration-300 hover:text-brand-orange
          ${isActive ? 'text-brand-orange' : ''}
          after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full
          after:h-[2px] after:bg-brand-orange after:transition-transform after:duration-300
          ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'}
          hover:after:scale-x-100 after:origin-center
        `}
      >
        {children}
      </Link>
    </li>
  );
};

// Ensure this line exists and is correct. This is what was causing the error.
export default NavLink;