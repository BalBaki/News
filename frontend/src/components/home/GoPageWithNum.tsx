import { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useSearchMutation } from '../../store';
import { type FilterSettings } from '../../types';
import Button from '../Button';
import { SEARCH_MUTATION_CACHE_KEY } from '../../utils/constants';

type GoPageWithNumProps = {
    maxPage: number;
};

const GoPageWithNum: React.FC<GoPageWithNumProps> = ({ maxPage }) => {
    const [pageNum, setPageNum] = useState<number>(1);
    const [search, { data: searchResult }] = useSearchMutation({
        fixedCacheKey: SEARCH_MUTATION_CACHE_KEY,
    });
    const { values, isValid } = useFormikContext<FilterSettings>();

    const handlePageGoClick = (): void => {
        if (!isValid || pageNum === searchResult?.page) return;

        search({ ...values, term: values.term.toLocaleLowerCase(), page: pageNum });
    };
    const handlePageNumChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(event.target.value);

        setPageNum(value > 1 ? (value > maxPage ? maxPage : value) : 1);
    };

    useEffect(() => {
        searchResult?.search && setPageNum(searchResult.page);
    }, [searchResult]);

    return (
        <div>
            <input
                type="number"
                className="page-num border-2 border-[#6B7280] w-16 p-0 mt-2 text-center rounded-md outline-none"
                min="1"
                max={maxPage}
                value={pageNum}
                onChange={handlePageNumChange}
            />
            <Button className="px-4 ml-2 border-2 border-[#6B7280] rounded-md" onClick={handlePageGoClick}>
                Go
            </Button>
        </div>
    );
};

export default GoPageWithNum;
