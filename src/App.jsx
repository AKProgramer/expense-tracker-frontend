import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import { Link } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const userId = urlParams.get('userId');

    // Handle token and userId from URL
    useEffect(() => {
      // Only show the popup if there's no token stored and it's not already showing
      if (!sessionStorage.getItem('token')) {
        setShowPopup(true);
      }
      // Handle token and userId from URL
      if (token && userId) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        window.history.replaceState({}, document.title, "/");
      } else {
        const storedToken = sessionStorage.getItem('token');
        const storedUserId = sessionStorage.getItem('userId');
        if (!storedToken || !storedUserId) {
          navigate('/');
        }
      }
    }, [navigate, token, userId]);


  const handleAgree = () => {
    setShowPopup(false);
    navigate('/register'); // Redirect to the register page
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup without any action
  };

  return (
    <div className="font-poppins">
      <Header />
      <div className="pb-16">
        <Outlet />
      </div>
      <Nav />

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg flex flex-col items-center">
            <p className=" mb-4">For a better experience, please log in first.</p>
            <div className="flex space-x-4">
              <button
                onClick={handleClosePopup}
                className="border-2 border-black text-black px-4 py-2 rounded-full"
              >
                Close
              </button>
              <Link to="/register">
                <button
                  onClick={handleAgree}
                  className="bg-black text-white px-4 py-2 rounded-full"
                >
                  Go to Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
