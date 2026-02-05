
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const ErrorPage = () => {    

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#F5F7FA] px-4">
            <h1 className="text-[120px] font-extrabold text-primary leading-none mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-500 text-base mb-6 text-center max-w-md">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>

            <Link to="/"> <Button size="lg" >
                Go Back Home
            </Button></Link>
        </div>
    );
};

export default ErrorPage;