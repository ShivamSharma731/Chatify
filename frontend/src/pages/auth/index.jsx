import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiclient from "@/lib/api-client";
import { useAppStore } from "@/store";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const { setUserInfo } = useAppStore();

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required !!");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required !!");
      return false;
    }
    if (!confirmpassword.length) {
      toast.error("Please confirm your password!!");
      return false;
    }
    if (password != confirmpassword) {
      toast.error("Both passwords are different !!");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required !!");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required !!");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiclient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.user.id) {
        setUserInfo(response.data.user);
        if (response.data.user.profileSetup) {
          navigate("/chat");
        } else {
          navigate("/profile");
        }
      }
      console.log(response);
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiclient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
      console.log(response);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-neutral-900 text-gray-400">
      <div className="h-[80vh] w-[40vw] bg-neutral-900 text-opacity-90 border-2 shadow-neutral-800 shadow-xl border-gray-800 rounded-3xl grid-cols-2 md:w-[30vw] lg:w-[40vw]">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold my-9">Welcome</h1>
            </div>
            <div className=" w-full my-5">
              <Tabs className="bg-neutral-900 w-96" defaultValue="login">
                <TabsList className="bg-neutral-900 gap-6 flex items-center justify-center">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:font-semibold rounded-none data-[state=active]:text-gray-400 data-[state=active]:border-b-purple-500 transition-all duration-100"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:font-semibold rounded-none data-[state=active]:text-gray-400 data-[state=active]:border-b-purple-500 transition-all duration-100"
                  >
                    SignUp
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="login"
                  className="my-10 flex flex-col items-center"
                >
                  <Input
                    placeholder="Email"
                    type="email"
                    className="bg-neutral-900 border-none mb-3"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="bg-neutral-900 border-none mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    className="p-6 rounded-full mt-16"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </TabsContent>

                <TabsContent
                  value="signup"
                  className="my-10 flex flex-col items-center"
                >
                  <Input
                    placeholder="Email"
                    type="email"
                    className="bg-neutral-900 border-none mb-3"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className="bg-neutral-900 border-none mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    className="bg-neutral-900 border-none mb-3"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    className="p-6 rounded-full mt-3"
                    onClick={handleSignup}
                  >
                    SignUp
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
