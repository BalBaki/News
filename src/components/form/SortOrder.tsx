import { Field } from 'formik';
import Dropdown from '../Dropdown';

const orders = ['relevance', 'newest', 'oldest'];

const SortOrder: React.FC = () => {
    const renderedOrders = orders.map((order) => {
        return (
            <div key={order}>
                <Field type="radio" name="sortOrder" id={order} value={order} className="ml-1" />
                <label className="capitilize pl-2" htmlFor={order}>
                    {order}
                </label>
            </div>
        );
    });

    return (
        <div className="w-full max-[340px]:mx-auto">
            <Dropdown placeholder="Select Sort Order">{renderedOrders}</Dropdown>
        </div>
    );
};

export default SortOrder;
