import Header from '../components/home/Header';
import Search from '../components/home/Search';
import NewsList from '../components/home/NewsList';

const Home: React.FC = () => {
    return (
        <>
            <Header />
            <Search />
            <NewsList />
        </>
    );
};

export default Home;
