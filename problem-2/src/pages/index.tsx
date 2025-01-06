import CurrencyDropDown, { CurrencyItem } from '@/components/CurrencyDropDown';
import Loading from '@/components/Loading';
import { calculateCurrencyRate, exchangeCurrency } from '@/utils/currency.util';
import { mockTimeResolve } from '@/utils/mockTime.util';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
export default function Home() {
  const [from, setFrom] = useState<unknown>(0)
  const [fromCurrency, setFromCurrency] = useState<null | CurrencyItem>(null);
  const [toCurrency, setToCurrency] = useState<null | CurrencyItem>(null);
  const [currencyData, setCurrencyData] = useState<CurrencyItem[]>([]);
  const [loading, setLoading] = useState(false)

  const handleInputFrom = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
      setFrom(0)
    } else {
      if (!isNaN(+value) && +value > 0) {
        setFrom(value)
      }
    }
  };

  const exchangeRate: number = useMemo(() => {
    if (fromCurrency?.price && toCurrency?.price) {
      return calculateCurrencyRate(fromCurrency?.price, toCurrency?.price)
    }
    return 0
  }, [fromCurrency, toCurrency])

  const to = useMemo(() => {
    return exchangeCurrency(parseFloat(from + ''), exchangeRate, 5)
  }, [from, exchangeRate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://interview.switcheo.com/prices.json');
        const jsonData = await response.json() as CurrencyItem[];
        const uniqueData = [...new Set(jsonData.map(item => item.currency))].map(currency =>
          jsonData.find(obj => obj.currency === currency)
        ) as CurrencyItem[]
        setCurrencyData(uniqueData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const currencyItemWithImages: CurrencyItem[] = useMemo(() => {
    return currencyData.map((item: CurrencyItem) => {
      return { ...item, iconPath: `/assets/images/tokens/${item.currency}.svg` }
    })
  }, [currencyData])

  // INIT SELECTED FROM CURRENCY & TO CURRENCY
  useEffect(() => {
    setFromCurrency(currencyItemWithImages[0])
    setToCurrency(currencyItemWithImages[0])
  }, [currencyItemWithImages])

  const handleSwap = async () => {
    try {
      setLoading(true)
      await mockTimeResolve(1.5)
      setLoading(false)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen items-center flex flex-col bg-black p-4 relative">
      {loading && <div className='w-full h-full bg-black bg-opacity-25 flex flex-row items-center justify-center absolute backdrop-blur z-20'>
        <Loading />
      </div>
      }
      <h1 className="text-3xl text-white text-center font-bold m-4">Currency Swap</h1>
      <div className="w-full sm:w-1/2 border h-32 rounded-3xl flex flex-col p-4 border-[#03efb0] max-w-[500px] p-4">
        <h2 className="text-white text-lg font-bold">FROM</h2>
        <div className="flex flex-row w-full">
          <input className="text-white text-3xl bg-transparent w-2/3" value={from + ''}
            onChange={e => handleInputFrom(e)}
          />
          <div className='w-2/3 sm:w-1/3'>
            <CurrencyDropDown currencyData={currencyItemWithImages} selectedCurrency={fromCurrency} handleSelect={setFromCurrency} />
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 border h-32 rounded-3xl flex flex-col p-4 border-[#03efb0] max-w-[500px] p-4 mt-4">
        <h2 className="text-white text-lg font-bold">TO</h2>
        <div className="flex flex-row w-full">
          <input className="text-white text-3xl bg-transparent w-2/3" value={to} disabled />
          <div className='w-2/3 sm:w-1/3'>
            <CurrencyDropDown currencyData={currencyItemWithImages} selectedCurrency={toCurrency} handleSelect={setToCurrency} />
          </div>
        </div>
      </div>
      <button className='h-24 hover:bg-[#03efb0] text-white text-2xl w-full sm:w-1/2 max-w-[500px] rounded-3xl mt-4 border border-[#03efb0]'
        onClick={() => { handleSwap() }}
      >Swap</button>
    </div>
  );
}
