import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading: React.FC = () => {
    return (
        <div className="relative h-full w-full bg-slate-300 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-8 min-w-8 h-1/6 w-1/6">
                <AiOutlineLoading3Quarters className="animate-spin h-full w-full" />
            </div>
        </div>
    );
};

export default Loading;
