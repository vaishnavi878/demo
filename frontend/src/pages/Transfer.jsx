import { useState } from "react";
import { Link } from "react-router-dom";

function Transfer() {
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [account, setAccount] = useState("4589");
  const [location, setLocation] = useState("");

  const handleTransfer = (event) => {
    event.preventDefault();

    alert(`Transfer of ₹${amount} initiated successfully!`);
  };

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="sidebar-logo">S</div>

          <div>
            <h2>SmartBank</h2>
            <span>Digital Banking</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <Link to="/dashboard" className="nav-item">
            <span>⌂</span>
            Dashboard
          </Link>

          <Link to="/accounts" className="nav-item">
            <span>▣</span>
            Accounts
          </Link>

          <Link
            to="/transfer"
            className="nav-item active"
          >
            <span>↗</span>
            Transfer Money
          </Link>

          <Link to="/transactions" className="nav-item">
            <span>↔</span>
            Transactions
          </Link>

          <div className="nav-item">
            <span>✦</span>
            AI Insights
          </div>

        </nav>

        <div className="sidebar-bottom">

          <div className="nav-item">
            <span>⚙</span>
            Settings
          </div>

          <Link to="/login" className="nav-item logout">
            <span>↪</span>
            Logout
          </Link>

        </div>

      </aside>


      {/* Main */}
      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <h1>Transfer Money</h1>

            <p>
              Send money securely to another account.
            </p>
          </div>

          <div className="profile-area">

            <button className="notification-btn">
              🔔
            </button>

            <div className="profile-avatar">
              V
            </div>

            <div className="profile-info">
              <strong>Vaishnavi</strong>
              <span>Customer</span>
            </div>

          </div>

        </header>


        <div className="transfer-layout">

          {/* Transfer Form */}
          <section className="transfer-card">

            <div className="transfer-title">

              <div className="transfer-icon">
                ↗
              </div>

              <div>
                <h2>Send Money</h2>

                <p>
                  Enter the recipient and transfer details.
                </p>
              </div>

            </div>


            <form onSubmit={handleTransfer}>

              {/* Sender Account */}
              <div className="transfer-field">

                <label>From Account</label>

                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                >

                  <option value="4589">
                    Savings Account •••• 4589
                  </option>

                  <option value="7832">
                    Current Account •••• 7832
                  </option>

                </select>

                <span className="available-balance">
                  Available balance: ₹1,25,000
                </span>

              </div>


              {/* Receiver */}
              <div className="transfer-field">

                <label>Receiver Account Number</label>

                <input
                  type="text"
                  placeholder="Enter receiver account number"
                  value={receiver}
                  onChange={(e) =>
                    setReceiver(e.target.value)
                  }
                  required
                />

              </div>


              {/* Amount */}
              <div className="transfer-field">

                <label>Amount</label>

                <div className="amount-input">

                  <span>₹</span>

                  <input
                    type="number"
                    placeholder="0.00"
                    min="1"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* Location */}
              <div className="transfer-field">

                <label>Transaction Location</label>

                <input
                  type="text"
                  placeholder="e.g. Chennai"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  required
                />

                <span className="field-hint">
                  This information helps our AI fraud detection system
                  identify unusual transactions.
                </span>

              </div>


              {/* Security Notice */}
              <div className="security-notice">

                <span>🔒</span>

                <div>
                  <strong>Secure Transaction</strong>

                  <p>
                    Your transaction will be monitored
                    by our AI-powered fraud detection system.
                  </p>
                </div>

              </div>


              <button
                type="submit"
                className="transfer-button"
              >
                Continue Transfer →
              </button>

            </form>

          </section>


          {/* Side Information */}
          <aside className="transfer-side">

            <div className="transfer-info-card">

              <h3>Transfer Summary</h3>

              <div className="summary-row">
                <span>From</span>
                <strong>•••• 4589</strong>
              </div>

              <div className="summary-row">
                <span>Available</span>
                <strong>₹1,25,000</strong>
              </div>

              <div className="summary-row">
                <span>Transfer Type</span>
                <strong>Bank Transfer</strong>
              </div>

            </div>


            <div className="fraud-card">

              <div className="fraud-icon">
                ✦
              </div>

              <h3>AI Fraud Protection</h3>

              <p>
                Every transaction is analyzed for
                suspicious patterns such as unusual
                amounts, locations and transaction
                frequency.
              </p>

              <div className="fraud-status">
                ✓ AI Protection Active
              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Transfer;