import classNames from 'classnames';
import { TbCircleDotted } from 'react-icons/tb';

type LoadingProps = {
    className?: string;
};

const Loading: React.FC<LoadingProps> = ({ className }) => {
    const classes = classNames(
        className,
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-16 min-w-16 h-[27%] w-[27%]'
    );

    return (
        <div className="relative h-full w-full">
            <div className={classes}>
                <TbCircleDotted className="animate-spin h-full w-full" />
            </div>
        </div>
    );
};

export default Loading;
