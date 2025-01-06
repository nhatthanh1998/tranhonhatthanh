interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    // Refactor the currency priority 
    const currencyPriority = {
        Osmosis: 100,
        Ethereum: 50,
        Arbitrum: 30,
        Zilliqa: 20,
        Neo: 20,
    };

    // Refactor the getPriority function for readability
    const getPriority = (currencyName: string): number => {
        return currencyPriority[currencyName] ?? -99;
    };

    // Filter balance function amount > 0
    function filterBalances(balances) {
        return balances.filter(balance => getPriority(balance.blockchain) > -99 && balance.amount > 0)
    }

    // Function to sort balances by priority
    function sortBalancesByPriority(balances) {
        return balances.sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain))
    }

    // Function to sort balances by priority
    function formatBalances(balances: WalletBalance[]) {
        balances.map((balance: WalletBalance) => {
            return {
                ...balance,
                formatted: balance.amount.toFixed()
            }
        })
    }

    // Refactor step:
    // Break down the step to sort balance for readability
    const formatedBalances = useMemo(() => {
        // Filter balance amount that > 0
        const positiveBalances = filterBalances(balances);
        const sortedBalances = sortBalancesByPriority(positiveBalances);
        return formatBalances(sortedBalances)
    },
        // remove unused dependencies: prices
        [balances]);


    // memo rows components depend on formatedBalance, prices.
    // Optimize the render time and avoid unnecessary render.
    const rows = useMemo(() => {
        return formatedBalances.map((balance: FormattedWalletBalance, index: number) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    className={classes.row}
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            )
        })
    }, [formatedBalances, prices])

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}