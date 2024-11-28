import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, userLoggedIn }) => {
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      setShowNotification(true);

      // Redirect to home page after showing notification
      const timer = setTimeout(() => {
        setShowNotification(false); // Hide notification
        navigate("/"); // Redirect to home
      }, 1000);

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [userLoggedIn, navigate]);

  if (!userLoggedIn) {
    return (
      <>
        {showNotification && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
            Cannot access the page. Redirecting to home...
          </div>
        )}
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
