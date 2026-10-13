import FeatureCard from "@/components/FeatureCard";
import { GiftIcon, MailIcon, QuestionIcon, ShoppingBagIcon } from "@/components/icons";

const LINKS = [
  { title: "SHOP ALL", href: "/shop", icon: <ShoppingBagIcon />, text: "Every mug in the collection." },
  { title: "GIFT CARDS", href: "/gift-cards", icon: <GiftIcon />, text: "Let them choose." },
  { title: "FAQ", href: "/faq", icon: <QuestionIcon />, text: "Quick answers." },
  { title: "CONTACT", href: "/contact", icon: <MailIcon />, text: "Talk to a person." },
];

// Four useful next steps for someone who has hit a dead end.
export default function PopularRow() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {LINKS.map((link) => (
        <li key={link.href} className="flex">
          <div className="flex-1">
            <FeatureCard icon={link.icon} title={link.title} href={link.href}>
              {link.text}
            </FeatureCard>
          </div>
        </li>
      ))}
    </ul>
  );
}
