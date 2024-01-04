import { useState, useEffect, useRef, PropsWithChildren } from 'react';
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';

type DropdownProps = {
    placeholder: string;
};

const Dropdown: React.FC<PropsWithChildren<DropdownProps>> = ({ children, placeholder }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const divEl = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handle = (event: MouseEvent) => {
            if (!divEl.current) return;

            if (!divEl.current.contains(event.target as Node)) {
                setIsOpened(false);
            }
        };

        document.addEventListener('click', handle, true);

        return () => {
            document.removeEventListener('click', handle);
        };
    }, []);

    const handleShowClick = (): void => {
        setIsOpened((c) => !c);
    };

    return (
        <div ref={divEl} className="relative border-2 capitalize break-all ">
            <div className="pl-1 flex justify-between items-center" onClick={handleShowClick}>
                <div>{placeholder}</div>
                {!isOpened ? <AiOutlineRight /> : <AiOutlineDown />}
            </div>
            {isOpened && (
                <div className="absolute w-full h-48 bg-white z-50 border-2 max-h-48 overflow-y-auto overflow-x-hidden left-[-2px] box-content">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
