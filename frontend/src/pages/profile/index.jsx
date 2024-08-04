import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import React, { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiclient from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants.js";

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectColor, setSelectColor] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstname);
      setLastName(userInfo.lastname);
      setSelectColor(userInfo.color);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast("first name is required...");
      return false;
    }
    if (!lastName) {
      toast("last name is required...");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiclient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectColor },
          { withCredentials: true }
        );

        if (response.status === 200 && response) {
          setUserInfo({ ...response.data });
          toast.success("Profile updated successfully");
          console.log(response);
          navigate("/chat");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        {/* Arrow Icon */}
        <div className="">
          <IoArrowBack
            className="text-4xl text-white/90 lg-text-6xl cursor-pointer "
            onClick={() => <Navigate to="/auth" />}
          />
        </div>

        <div className="grid grid-cols-2">
          {/* Image Avatar */}
          <div
            className="h-full w-32  relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="rounded-full overflow-hidden h-32 w-32 ">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32  text-5xl border-[2px] flex items-center justify-center rounded-full ${getColor(
                    selectColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {/* hovered over the avatar */}
            {hovered && (
              <div className="cursor-pointer rounded-full absolute w-32 h-32 inset-15 flex justify-center items-center bg-black/80 text-white">
                {image ? <FaTrash /> : <FaPlus />}
              </div>
            )}
          </div>
          {/* Input fields */}
          <div className="flex flex-col justify-center items-center min-w-32 gap-5 text-white">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectColor === index
                      ? "outline outline-1 outline-white/100"
                      : ""
                  }`}
                  onClick={() => setSelectColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Button
            className="h-12 w-120 bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={saveChanges}
          >
            Continue <IoArrowForward className="mt-1 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
