import React from 'react'


export default function WalletCard(wallet) {
  const userWallet = wallet.wallet
  return (
    // <>
    // <h5>{JSON.stringify(wallet)}</h5>
    // </>
    <div className="wallet-card">
      <h3>CIS Bayad Digital Wallet</h3>
      <div className="card-details">
        <p>Username: {userWallet.username}</p>
        <p>Email: {userWallet.email}</p>
        <p>Date Created: {userWallet.date_created}</p>
        <p>Balance: {userWallet.balance}</p>
      </div>
    </div>
  );
}
