import { APP_NAME } from "@/lib/constants";
import { useTranslations } from "next-intl";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const t = useTranslations('Footer');

    return (
        <footer className="border-t">
            <div className="flex-center p-5">
                &copy; {currentYear} {APP_NAME}. {t('copyright')}
            </div>
        </footer>
    );
}

export default Footer;