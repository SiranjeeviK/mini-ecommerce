import { Link } from "react-router-dom";

const NoSearchResultsFound = () => {
    return (
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <h1 className="display-4">No Results Found</h1>
                    <p className="lead">Try adjusting your search or filter to find what you're looking for.</p>
                    <Link to={"/"} className="btn btn-secondary">Go Back</Link>
                </div>
            </div>
        </div>
    );
};

export default NoSearchResultsFound;