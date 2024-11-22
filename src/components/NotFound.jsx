import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate(); // Hook to access the navigate function

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center flex justify-center flex-col">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <p className="mt-4 text-gray-500">
          It might have been removed, or you may have entered an incorrect URL.
        </p>

        {/* Illustration */}
        <img
          src="https://cdn2.hubspot.net/hubfs/242200/shutterstock_774749455.jpg"
          alt="404 Not Found Illustration"
          className="mt-8 rounded-lg shadow-lg w-[400px] h-[50%] justify-center mx-auto"
        />

        {/* Navigation Links */}
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Go to Home
          </Link>
          <button
            onClick={handleGoBack}
            className="inline-block ml-4 px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
