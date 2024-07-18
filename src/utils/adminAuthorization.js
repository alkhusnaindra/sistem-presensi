import { useRouter } from "next/router";
import { useEffect, useState, createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext();

const withAdminAuth = (Component) => {
  return (props) => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const toast = useToast()

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        console.log(1)
      } else {
        try {
          const payload = jwtDecode(token);
          if (!payload.idAdmin) {
            console.log(52862)
            router.push("/");
          } else if (payload.exp < Date.now() / 1000) {
            toast({
              title: "Session has expired",
              status: "warning",
              position: "bottom-right",
              isClosable: true,
            });
            router.push("/");
            console.log(2)
          } else {
            setUserData(payload);
          }
        } catch (error) {
          console.log(3)
          console.error("Error decoding token:", error);
          router.push("/");
        }
      }
    }, [router]);

    return (
      <AuthContext.Provider value={userData}>
        <Component {...props} />
      </AuthContext.Provider>
    );
  };
}

export default withAdminAuth