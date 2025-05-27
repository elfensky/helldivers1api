import Image from 'next/image';
import Galaxy from '@/components/h1/Galaxy';

export default function HomePage() {
    return (
        <div className="flex min-h-full w-full flex-row bg-purple-800">
            <section className="max-w-1/3 w-full">stat go here</section>
            <Galaxy />
        </div>
    );
}
