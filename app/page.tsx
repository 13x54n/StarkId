import Image from "next/image";
import landingBanner from '@/public/landing-banner.jpg';
import { Marquee } from "@/components/ui/home/marquee";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-4 gap-4 py-2">
      <p className="font-semibold text-lg leading-6 text-center">People-first on-chain directory, network,<br /> and community.</p>
      <Image src={landingBanner} alt="Logo" width={300} height={400} objectFit="cover" />

      <Marquee className=" text-sm py-1">
        <ul className="flex items-center gap-2 text-center text-sm">
          <li>
            <p className="flex items-center">• 🧠 Human Verified ID</p>
          </li>
          <li>
            <p className="flex items-center">• 🪪 Starknet Name Service</p>
          </li>
          <li>
            <p className="flex items-center">• 📦 Fair Airdrop to Real Humans</p>
          </li>
        </ul>
      </Marquee>
    </div>
  );
}
