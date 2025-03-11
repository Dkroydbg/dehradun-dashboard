import Image from "next/image";
import HomePage from "./frontPage";
import { Arapey } from "next/font/google";

const roboto = Arapey({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={roboto.className}>
      <HomePage />
    </div>
  );
}
