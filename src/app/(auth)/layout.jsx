import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
