"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface FormState {
  success: boolean;
  fieldErrors?: Record<string, string[]>;
  formError: string;
}
const CredentialsSignUpForm = () => {
  const t = useTranslations('Auth');
  const initialState: FormState = {
    success: false,
    fieldErrors: {},
    formError: "",
  };
  const [state, action] = useActionState(signUpUser, initialState);
  // This Code For CallbackUrl
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  // End Code
  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? t('submittingButton') : t('signUpButton')}
      </Button>
    );
  };
  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">{t('name')}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={signUpDefaultValues.name}
          />
          {state.fieldErrors?.name && (
            <p className="text-sm text-destructive">
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            defaultValue={signUpDefaultValues.email}
          />
          {state.fieldErrors?.email && (
            <p className="text-sm text-destructive">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            defaultValue={signUpDefaultValues.password}
          />
          {state.fieldErrors?.password && (
            <p className="text-sm text-destructive">
              {state.fieldErrors.password[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="password"
            defaultValue={signUpDefaultValues.confirmPassword}
          />
          {state.fieldErrors?.confirmPassword && (
            <p className="text-sm text-destructive">
              {state.fieldErrors.confirmPassword[0]}
            </p>
          )}
        </div>
        <div>
          <SignUpButton />
        </div>
        {state.formError && (
          <div className="text-center text-destructive mt-2">
            {state.formError}
          </div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          {t('hasAccount')}{" "}
          <Link href="/sign-in" target="_self" className="link">
            {t('signInButton')}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignUpForm;
