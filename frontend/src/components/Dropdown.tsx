import { useState, useEffect, useRef, type PropsWithChildren } from 'react';
import { AiOutlineRight } from 'react-icons/ai';

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
        <div ref={divEl} className="relative border-2 border-[#6B7280] capitalize break-word rounded-md">
            <div className="px-1 flex justify-between items-center" onClick={handleShowClick}>
                <div>{placeholder}</div>
                <AiOutlineRight className={`transition-all ${isOpened ? 'rotate-90' : 'rotate-0'}`} />
            </div>
            {isOpened && (
                <div
                    className="absolute w-full h-48 bg-white z-50 border-2 border-[#6B7280] max-h-48 overflow-y-auto 
                        overflow-x-hidden left-[-2px] box-content origin-top animate-dropdown rounded-md"
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
