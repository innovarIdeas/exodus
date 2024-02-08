import Image from "next/image";
import Link from "next/link";

interface NavCardProps {
  image: string;
  title: string;
  link: string;
}

export default function NavCard ({ link, image, title }: NavCardProps) {
  return (
    <Link href={link} className="py-8 px-10 text-center border border-white shadow-lg bg-white my-6 items-center flex flex-col rounded-3xl mx-4">
      <Image src={image} alt="Logo" width={64} height={64} />
      <h3 className="mt-4 font-bold text-sm text-black">
        {title}
      </h3>
    </Link>
  );
}
