import { Link } from "react-router-dom";

function Accounts() {
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

          <Link
            to="/accounts"
            className="nav-item active"
          >
            <span>▣</span>
            Accounts
          </Link>

          <Link to="/transfer" className="nav-item">
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


      {/* Main Content */}
      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <h1>My Accounts</h1>

            <p>
              Manage your bank accounts and balances.
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


        {/* Total Balance */}
        <section className="accounts-total">

          <div>
            <span>Total Balance</span>

            <h2>₹1,25,000.00</h2>

            <p>
              Across all your SmartBank accounts
            </p>
          </div>

          <div className="total-icon">
            ₹
          </div>

        </section>


        {/* Account Cards */}
        <section className="accounts-section">

          <div className="section-heading">

            <div>
              <h2>Your Accounts</h2>

              <p>
                2 active accounts
              </p>
            </div>

          </div>


          <div className="accounts-grid">

            {/* Savings */}
            <div className="account-card">

              <div className="account-card-top">

                <div className="account-type-icon savings">
                  ₹
                </div>

                <span className="account-status">
                  ● Active
                </span>

              </div>

              <div className="account-name">
                <h3>Savings Account</h3>

                <span>
                  Account •••• 4589
                </span>
              </div>

              <div className="account-balance">

                <span>Available Balance</span>

                <strong>
                  ₹1,00,000.00
                </strong>

              </div>

              <div className="account-footer">

                <span>
                  Interest Rate
                </span>

                <strong>
                  3.5% p.a.
                </strong>

              </div>

            </div>


            {/* Current */}
            <div className="account-card">

              <div className="account-card-top">

                <div className="account-type-icon current">
                  ₹
                </div>

                <span className="account-status">
                  ● Active
                </span>

              </div>

              <div className="account-name">
                <h3>Current Account</h3>

                <span>
                  Account •••• 7832
                </span>
              </div>

              <div className="account-balance">

                <span>Available Balance</span>

                <strong>
                  ₹25,000.00
                </strong>

              </div>

              <div className="account-footer">

                <span>
                  Account Type
                </span>

                <strong>
                  Current
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* Account Information */}
        <section className="account-info-grid">

          <div className="account-info-card">

            <div className="info-icon">
              🔒
            </div>

            <div>
              <h3>Banking Security</h3>

              <p>
                Your account information is protected
                using secure authentication and encrypted
                communication.
              </p>
            </div>

          </div>


          <div className="account-info-card">

            <div className="info-icon ai">
              ✦
            </div>

            <div>
              <h3>AI Financial Insights</h3>

              <p>
                SmartBank analyzes your spending patterns
                to provide personalized financial insights.
              </p>
            </div>

          </div>

        </section>


        {/* Quick Actions */}
        <section className="account-actions">

          <Link to="/transfer" className="account-action">
            <span>↗</span>

            <div>
              <strong>Transfer Money</strong>
              <small>Send money to another account</small>
            </div>
          </Link>


          <Link to="/transactions" className="account-action">
            <span>↔</span>

            <div>
              <strong>View Transactions</strong>
              <small>Check your account activity</small>
            </div>
          </Link>

        </section>

      </main>

    </div>
  );
}

export default Accounts;