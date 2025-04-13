import React from 'react';
import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Github, Globe, Linkedin } from 'lucide-react';
import { EditProfileModal } from '../components/EditProfileModal';

interface ProfileData {
  name: string;
  profession: string;
  email: string;
  phone: string;
  location: string;
  username: string;
  bio: string;
  github: string;
  linkedin: string;
  website: string;
  skills: string[];
}


export function EditProfilePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80");
    const [profileData, setProfileData] = useState({
      name: "John Doe",
      profession: "Senior Software Engineer",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      username: "@johndoe",
      bio: "Passionate software engineer with 5+ years of experience in full-stack development.",
      github: "github.com/johndoe",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.dev",
      skills: ["React", "TypeScript", "Node.js", "Python", "AWS"]
    });
   function onImageEditClick() {
    setIsModalOpen(true);
   }

   function onBack() {
       window.history.back();
   }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setProfileData({ ...profileData, skills });
  };

  const handleSelectNewImage = () => {
    const newImageUrl = prompt("Enter new image URL (for demo purposes):");
    if (newImageUrl) {
      setProfileImage(newImageUrl);
      setIsModalOpen(false);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft size={24} className="mr-2" />
              <span className="text-lg font-medium">Edit Profile</span>
            </button>
            <button
              onClick={onBack}
              className="text-blue-500 font-semibold hover:text-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border border-gray-200"
            />
            <button
              onClick={onImageEditClick}
              className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors shadow-lg"
            >
              <Camera size={18} />
            </button>
          </div>
          <button
            onClick={onImageEditClick}
            className="text-blue-500 font-medium hover:text-blue-600"
          >
            Change profile photo
          </button>
        </div>

        {/* Edit Sections */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="border-b border-gray-200 pb-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-32 text-sm font-medium text-gray-700">Name</span>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-0 focus:ring-0 text-base"
                  placeholder="Your name"
                />
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm font-medium text-gray-700">Username</span>
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-0 focus:ring-0 text-base"
                  placeholder="@username"
                />
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm font-medium text-gray-700">Profession</span>
                <input
                  type="text"
                  name="profession"
                  value={profileData.profession}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-0 focus:ring-0 text-base"
                  placeholder="Your profession"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex">
              <span className="w-32 text-sm font-medium text-gray-700">Bio</span>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                rows={4}
                className="flex-1 px-3 py-2 border-0 focus:ring-0 text-base resize-none"
                placeholder="Write a short bio..."
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-base font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-32 text-sm font-medium text-gray-700">Email</span>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-0 focus:ring-0 text-base"
                  placeholder="your@email.com"
                />
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm font-medium text-gray-700">Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-0 focus:ring-0 text-base"
                  placeholder="Your phone number"
                />
              </div>
              <div className="flex items-center">
                <span className="w-32 text-sm font-medium text-gray-700">Location</span>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-0 focus:ring-0 text-base"
                  placeholder="Your location"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-base font-semibold mb-4">Social Links</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-32 flex items-center text-sm font-medium text-gray-700">
                  <Github size={16} className="mr-2" />
                  GitHub
                </span>
                <input
                  type="text"
                  name="github"
                  value={profileData.github}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-0 focus:ring-0 text-base"
                  placeholder="Your GitHub profile"
                />
              </div>
              <div className="flex items-center">
                <span className="w-32 flex items-center text-sm font-medium text-gray-700">
                  <Linkedin size={16} className="mr-2" />
                  LinkedIn
                </span>
                <input
                  type="text"
                  name="linkedin"
                  value={profileData.linkedin}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-0 focus:ring-0 text-base"
                  placeholder="Your LinkedIn profile"
                />
              </div>
              <div className="flex items-center">
                <span className="w-32 flex items-center text-sm font-medium text-gray-700">
                  <Globe size={16} className="mr-2" />
                  Website
                </span>
                <input
                  type="text"
                  name="website"
                  value={profileData.website}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border-0 focus:ring-0 text-base"
                  placeholder="Your personal website"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-base font-semibold mb-4">Professional Skills</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={profileData.skills.join(', ')}
                onChange={handleSkillsChange}
                className="w-full px-3 py-2 border-0 focus:ring-0 text-base"
                placeholder="Add skills (comma-separated)"
              />
              <p className="text-sm text-gray-500">
                Current skills: {profileData.skills.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectNewImage={handleSelectNewImage}
        onRemoveImage={handleRemoveImage}
      />
    </div>
  );
}