import React from "react";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { SocialLinks } from "../components/Profile/SocialLinks";
import { CodePreview } from "../components/Profile/CodePreview";
import { DonationSection } from "../components/Profile/DonationSection";

const ProfilePage: React.FC = () => {
  return (
    <div className="grid grid-cols-3 bg-gray-100 gap-0 h-screen p-16">
      {/* Header Section */}
      <div className="div1 col-span-3 text-white flex items-center justify-center text-2xl font-bold">
        <ProfileHeader />
      </div>
      
      {/* Profile Info */}
      <div className="div2 col-span-2 bg-gray-100 p-6 flex flex-col items-center justify-center  rounded-lg">
        <CodePreview />
      </div>
      <div className="row-span-2 bg-gray-100 h-fit sticky top-0">
      {/* Stats Section */}
      <div className="div3 col-span-1 flex flex-col items-center justify-center p-4">
        <SocialLinks />
      </div>
      
      {/* Additional Info */}
      <div className="div4 col-span-1 flex flex-col items-center justify-center p-4">
        <DonationSection />
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
