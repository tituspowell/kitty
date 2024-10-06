import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { theme } from '../styles/theme';

function NavLink({ path, text }: { path: string; text: string }) {
  const pathname: string = usePathname();
  const isLinkToCurrentPage: boolean = pathname === path;
  const sharedClasses = 'py-4 px-2 font-semibold transition duration-300';

  return (
    <article>
      {isLinkToCurrentPage ? (
        <span
          className={`${sharedClasses} ${theme.link.currentPageSoInactiveLink} border-b-2 ${theme.border}`}
        >
          {text}
        </span>
      ) : (
        <Link
          href={path}
          className={`${sharedClasses} ${theme.link.activeLink}`}
        >
          {text}
        </Link>
      )}
    </article>
  );
}
export default NavLink;
