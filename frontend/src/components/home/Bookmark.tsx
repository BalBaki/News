import classNames from 'classnames';
import { CiBookmark } from 'react-icons/ci';

type BookMarkProps = {
    className?: string;
};

const BookMark: React.FC<BookMarkProps> = ({ className }) => {
    const classes = classNames(className);
    const handleClick = () => {
        console.log('asdad');
    };

    return (
        <div className={classes}>
            <CiBookmark className="w-full h-full cursor-pointer" onClick={handleClick} />
        </div>
    );
};

export default BookMark;
