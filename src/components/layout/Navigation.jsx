//auth
import { auth } from '@/auth';
//next
import Link from 'next/link';
import Image from 'next/image';

export default async function Navigation() {
    // const router = useRouter();
    const session = await auth();

    const links = [
        // { href: '/discord', label: 'Discord' },
        // { href: '/reviews', label: 'Reviews' },

        { href: '/war', label: 'War' },
        // { href: '/history', label: 'History' },
        // { href: '/stats', label: 'Stats' },

        { href: '/docs', label: 'Docs' },
        { href: '/api', label: 'API' },
    ];

    if (session && session.user) {
        //only show if user is logged in
        links.push({ href: '/dashboard', label: 'Dashboard' });
    }

    return (
        <nav className="flex w-fit items-center gap-4">
            <ul className="flex items-center gap-4">
                <li>
                    <Link
                        href="https://github.com/elfensky/helldivers1api"
                        data-umami-event="header-github"
                    >
                        <Image
                            src="/images/github_light.webp"
                            alt="Logo of Helldivers Bot, which is a cartoon depiction of a spy sattelite"
                            className="max-w-[2rem]"
                            width={64}
                            height={64}
                            priority={true}
                        />
                    </Link>
                </li>
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            data-umami-event={'header-' + link.label.toLowerCase()}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
