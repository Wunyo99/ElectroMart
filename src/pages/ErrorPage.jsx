import { LucideFileExclamationPoint } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex flex-col gap-5 justify-center h-90 items-center">
      <div className="text-yellow-500">
        <LucideFileExclamationPoint size={35} />
      </div>
      <div className="text-center space-y-">
        <h1 className="text-6xl font-bold mb-4 italic">404 Not Found</h1>
        <p className="text-xl italic mb-6">This page does not exist</p>
        <Link className="bg-teal-500 p-3 text-white font-medium rounded-xl hover:bg-teal-600" to="/">Back to Home</Link>
      </div>
    </section>
  );
};

export default ErrorPage;
