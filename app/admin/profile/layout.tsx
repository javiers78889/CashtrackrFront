

import ProfileTabs from "@/components/profile/ProfileTabs";
import ToasterNotification from "@/components/ui/ToasterNotification";


export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <ProfileTabs />
        {children}
        <ToasterNotification />
    </>
  );
}
