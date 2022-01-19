import React, { useEffect, useState } from "react";
import { Address } from "@aurora-is-near/engine";
import { useAccount } from "../../data/account";

const fetchBalance = async (account, address) => {
  return (await account.near.aurora.getBalance(address)).unwrap();
};

export default function Dashboard(props) {
  const account = useAccount();
  const strAddress = props.address;
  const [address, setAddress] = useState(Address.zero());
  const [balance, setBalance] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAddress(Address.parse(strAddress).unwrapOrElse(() => Address.zero()));
  }, [strAddress]);

  useEffect(() => {
    if (!account || !account.near) {
      return;
    }
    setLoading(true);

    fetchBalance(account, address).then((b) => {
      setBalance(b);
      setLoading(false);
    });
  }, [address, account]);
  return (
    <div>
      <div>Account: {address.toString()}</div>
      <div>Balance: {loading ? "Loading" : balance.toString()}</div>
    </div>
  );
}
