import { Link } from 'react-router-dom';

const NoPage: React.FC = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div>
                <div
                    className="flex justify-center items-center text-[12rem] h-40 max-sm:text-[8rem] 
                        max-sm:h-32"
                >
                    <div className="drop-shadow-[0_0_.4rem_crimson] translate-x-7 max-sm:translate-x-5">4</div>
                    <div className="drop-shadow-[0_0_.4rem_crimson]">0</div>
                    <div className="drop-shadow-[0_0_.4rem_crimson] -translate-x-5 max-sm:-translate-x-3">4</div>
                </div>
                <div className="text-5xl drop-shadow-[0_0_.2rem_crimson] text-center max-sm:text-3xl">
                    Page Not Found
                </div>
                <div className="text-5xl drop-shadow-[0_0_.2rem_crimson] text-center mt-1 max-sm:text-3xl ">
                    Click
                    <span className="mx-2.5 border-b-2 border-b-black">
                        <Link to="/">Here</Link>
                    </span>
                    to Go Homepage
                </div>
            </div>
        </div>
    );
};

export default NoPage;
