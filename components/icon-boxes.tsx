import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useTranslations } from "next-intl";

const IconBoxes = () => {
  const t = useTranslations('IconBoxes');
  return (
    <div>
      <Card>
        <CardContent className="grid md:grid-cols-4 gap-4 p-4">
          <div className="space-y-2">
            <ShoppingBag />
            <div className="text-sm font-bold">{t('freeShipping')}</div>
            <div className="text-sm text-muted-foreground">
              {t('freeShippingDesc')}
            </div>
          </div>
          <div className="space-y-2">
            <DollarSign />
            <div className="text-sm font-bold">{t('moneyBack')}</div>
            <div className="text-sm text-muted-foreground">
              {t('moneyBackDesc')}
            </div>
          </div>
          <div className="space-y-2">
            <WalletCards />
            <div className="text-sm font-bold">{t('payment')}</div>
            <div className="text-sm text-muted-foreground">
              {t('paymentDesc')}
            </div>
          </div>
          <div className="space-y-2">
            <Headset />
            <div className="text-sm font-bold">{t('support')}</div>
            <div className="text-sm text-muted-foreground">
              {t('supportDesc')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
