import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-orange-900 mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-white mb-2">Page Not Found</h2>
                    <p className="text-slate-400 text-lg max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-orange-900 hover:bg-orange-800 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        <span>Back to Home</span>
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Go Back</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
