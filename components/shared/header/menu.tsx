import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UserButton from "./user-button";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";

const Menu = () => {
    const t = useTranslations();
    return (<div>
        <nav className="hidden md:flex w-full max-w-xs gap-1">
            <ModeToggle />
            <LanguageSwitcher />
            <Button asChild variant="ghost">
                <Link href="/cart">
                    <ShoppingCart /> {t('Menu.cart')}
                </Link>
            </Button>
            <UserButton />
        </nav>
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <EllipsisVertical />
                </SheetTrigger>
                <SheetContent className="flex flex-col items-start">
                    <SheetTitle>{t('Menu.menu')}</SheetTitle>
                    <ModeToggle />
                    <LanguageSwitcher />
                    <Button asChild variant="ghost">
                        <Link href="/cart">
                            <ShoppingCart /> {t('Menu.cart')}
                        </Link>
                    </Button>
                    <UserButton />
                    <SheetDescription />
                </SheetContent>
            </Sheet>
        </nav>
    </div>);
}

export default Menu;