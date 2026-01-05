import { Link } from "react-router";

const ErrorCard = ({ title }) => (
    <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
            <h2 className="card-title text-error">{title}</h2>
            <Link to="/" className="btn btn-primary btn-sm">
                Go Home
            </Link>
        </div>
    </div>
);

export default ErrorCard;
