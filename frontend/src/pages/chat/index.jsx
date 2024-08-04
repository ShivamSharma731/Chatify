import { useAppStore } from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      // this restricts the access of chat page if profile is not completed
      toast("Please complete ur profile to continue to Chattin...");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return <div>Chat Page</div>;
};

export default Chat;
