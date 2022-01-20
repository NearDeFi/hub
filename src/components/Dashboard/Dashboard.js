import React, { useEffect, useState } from "react";
import { useAurora } from "../../data/near";
import { useErc20Balances } from "../../data/aurora/token";
import { toAddress } from "../../data/utils";
import Big from "big.js";

const OneEth = Big(10).pow(18);

const fetchBalance = async (aurora, address) => {
  return Big((await aurora.getBalance(toAddress(address))).unwrap());
};

const StandardErc20 = [
  "0x8bec47865ade3b172a928df8f990bc7f2a3b9f79",
  "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
  "0xFa94348467f64D5A457F75F8bc40495D33c65aBB",
];

export default function Dashboard(props) {
  const aurora = useAurora();
  const address = props.address;
  const [balance, setBalance] = useState(false);
  const [loading, setLoading] = useState(true);

  const erc20Balances = useErc20Balances(address, StandardErc20);

  useEffect(() => {
    if (!aurora) {
      return;
    }
    setLoading(true);

    fetchBalance(aurora, address).then((b) => {
      setBalance(b);
      setLoading(false);
    });
  }, [address, aurora]);
  return (
    <div>
      <div>Account: {address.toString()}</div>
      <div>
        Balance: {loading ? "Loading" : `${balance.div(OneEth).toFixed(6)} ETH`}
      </div>
      <div>
        ERC20 balances:
        <ul>
          {Object.entries(erc20Balances || {}).map(
            ([tokenAddress, balance]) => {
              return (
                <li key={`token-balance-${tokenAddress}`}>
                  {tokenAddress}: {balance.toFixed(0)}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}
