import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading: React.FC = () => {
    return (
        <div className="relative h-full w-full opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-16 min-w-16 h-1/3 w-1/3">
                <AiOutlineLoading3Quarters className="animate-spin h-full w-full" />
            </div>
        </div>
    );
};

export default Loading;
