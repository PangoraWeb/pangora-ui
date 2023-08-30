import Server from "./server";
import Trending from "./trending";

const Side = () => {
    return (
        <div className="w-1/3">
            <Trending />
            <Server />
        </div>
    )
}

export default Side;