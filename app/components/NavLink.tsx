import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({ path, text }: { path: string; text: string }) {
  const pathname: string = usePathname();
  const isActiveLink: boolean = pathname === path;
  const sharedClasses = 'py-4 px-2 font-semibold transition duration-300';

  return (
    <article>
      {isActiveLink ? (
        <span
          className={`${sharedClasses} text-amber-700 hover:text-amber-700 border-b-2 border-amber-700`}
        >
          {text}
        </span>
      ) : (
        <Link
          href={path}
          className={`${sharedClasses} text-amber-500 hover:text-amber-300}`}
        >
          {text}
        </Link>
      )}
    </article>
  );
}
export default NavLink;
