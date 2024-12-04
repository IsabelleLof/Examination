"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Image src="/assets/poster.jpg" alt="poster" width={500} height={500} />
      <Link href="/menu">Menu</Link>
    </main>
  );
}
