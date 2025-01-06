import React, { useMemo, useState } from 'react';
import Image from 'next/image'


export interface CurrencyItem {
    currency?: string;
    price?: number;
    iconPath?: string;
}


interface comProps {
    currencyData: CurrencyItem[]
    selectedCurrency: CurrencyItem | null
    handleSelect: (item: CurrencyItem) => void
}

function CurrencyDropDown(props: comProps) {
    const { currencyData, selectedCurrency, handleSelect } = props
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const renderOptions = useMemo(() => {
        return currencyData.map((item) => {
            return (
                <div key={item.currency} className='flex flex-row px-4 hover:bg-gray-200'
                    onClick={() => {
                        handleSelect(item)
                        setIsOpen(false)
                    }}
                >
                    <Image src={item?.iconPath || ''} alt={item?.currency || ''} width={30} height={30} />
                    <a
                        key={item.currency}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 "
                        role="menuitem"
                    >
                        {item.currency}
                    </a>
                </div>
            )
        })
    }, [currencyData, handleSelect])

    return (
        <div className="relative inline-block text-left w-full">
            <div
                onClick={toggleDropdown}
                className="inline-flex w-full px-4 py-2 bg-transparent"
            >
                <div className='flex flex-row'>
                    <Image src={selectedCurrency?.iconPath || ''} alt={selectedCurrency?.currency || ''} width={30} height={30} />
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-white bg-transparent font-medium text-2xl"
                        role="menuitem"
                    >
                        {selectedCurrency?.currency}
                    </a>
                </div>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 overflow-hidden"
                >
                    <div className="py-1 h-[400px] overflow-y-auto" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {renderOptions}
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(CurrencyDropDown);