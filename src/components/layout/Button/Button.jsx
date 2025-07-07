import Link from 'next/link';

export default function Button({
    type,
    href,
    label,
    umami = label.toLowerCase(),
    // aria = `a button linking to ${label}`,
}) {
    if (type === 'link') {
        return (
            <Link
                href={href}
                data-umami-event={'button-' + umami}
                className="link flex items-center justify-center gap-2 bg-blue-500 p-1 text-white"
            >
                {label}
            </Link>
        );
    }

    if (type === 'button') {
        return (
            <Link
                href={href}
                data-umami-event={'button-' + umami}
                className="button flex items-center justify-center gap-2 bg-amber-300 p-1 text-white hover:bg-amber-500"
            >
                {label}
            </Link>
        );
    }

    throw new Error('Unknown type');
}
