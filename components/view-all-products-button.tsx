import { Link } from "@/i18n/navigation";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

const ViewAllProductsButton = () => {
  const t = useTranslations('Home');
  return (
    <div className="flex justify-center items-center my-8">
      <Button asChild className="px-8 py-4 text-lg font-semibold">
        <Link href="/search">{t('viewAll')}</Link>
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
