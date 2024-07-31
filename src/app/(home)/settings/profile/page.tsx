import { ProfileForm } from "@/app/(home)/settings/profile/components/profile-form";

export default async function ProfileSettingsPage() {
  return (
    <div className="flex flex-col px-4 py-4 gap-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
