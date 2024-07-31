import { PasswordForm } from "@/app/(home)/settings/password/components/password-form";

export default async function PasswordSettingsPage() {
  return (
    <div className="flex flex-col px-4 py-4 gap-6">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        {/* <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p> */}
      </div>
      <PasswordForm />
    </div>
  );
}
