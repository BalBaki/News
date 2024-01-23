import PageUpIcon from '../components/PageUpIcon';
import Navbar from '../components/home/Navbar';
import Search from '../components/home/Search';

const Home: React.FC = () => {
    return (
        <>
            <div className="mt-2 mr-1">
                <Navbar />
            </div>
            <Search />
            <PageUpIcon />
        </>
    );
};

export default Home;
