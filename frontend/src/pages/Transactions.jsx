import { Link } from "react-router-dom";

const transactions = [
  {
    name: "Amazon",
    category: "Shopping",
    date: "2 Oct 2026",
    amount: "-₹2,499",
    type: "expense",
    status: "Completed",
  },
  {
    name: "Salary",
    category: "Income",
    date: "1 Oct 2026",
    amount: "+₹75,000",
    type: "income",
    status: "Completed",
  },
  {
    name: "Swiggy",
    category: "Food",
    date: "1 Oct 2026",
    amount: "-₹650",
    type: "expense",
    status: "Completed",
  },
  {
    name: "BigBasket",
    category: "Groceries",
    date: "30 Sep 2026",
    amount: "-₹1,850",
    type: "expense",
    status: "Completed",
  },
  {
    name: "Electricity Bill",
    category: "Bills",
    date: "29 Sep 2026",
    amount: "-₹2,200",
    type: "expense",
    status: "Completed",
  },
  {
    name: "Bank Transfer",
    category: "Transfer",
    date: "28 Sep 2026",
    amount: "-₹5,000",
    type: "expense",
    status: "Completed",
  },
];

function Transactions() {
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

          <Link to="/transfer" className="nav-item">
            <span>↗</span>
            Transfer Money
          </Link>

          <Link
            to="/transactions"
            className="nav-item active"
          >
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
            <h1>Transactions</h1>

            <p>
              View and manage your recent transactions.
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


        {/* Summary */}
        <section className="transaction-summary">

          <div className="transaction-stat">
            <span>Total Income</span>
            <strong className="stat-income">
              ₹75,000
            </strong>
          </div>

          <div className="transaction-stat">
            <span>Total Expenses</span>
            <strong className="stat-expense">
              ₹17,199
            </strong>
          </div>

          <div className="transaction-stat">
            <span>Transactions</span>
            <strong>6</strong>
          </div>

          <div className="transaction-stat">
            <span>Current Balance</span>
            <strong>₹1,25,000</strong>
          </div>

        </section>


        {/* Transactions */}
        <section className="transactions-panel">

          <div className="transactions-toolbar">

            <div>
              <h2>Transaction History</h2>

              <p>
                Your latest account activity
              </p>
            </div>

            <select className="transaction-filter">
              <option>All Transactions</option>
              <option>Income</option>
              <option>Expenses</option>
            </select>

          </div>


          <div className="transaction-table">

            <div className="transaction-table-header">

              <span>Transaction</span>
              <span>Category</span>
              <span>Date</span>
              <span>Status</span>
              <span>Amount</span>

            </div>


            {transactions.map((transaction, index) => (

              <div
                className="transaction-table-row"
                key={index}
              >

                <div className="table-transaction-name">

                  <div className={`table-icon ${transaction.type}`}>
                    {transaction.type === "income" ? "↑" : "↓"}
                  </div>

                  <div>
                    <strong>
                      {transaction.name}
                    </strong>

                    <span>
                      Account •••• 4589
                    </span>
                  </div>

                </div>


                <span className="category">
                  {transaction.category}
                </span>


                <span className="date">
                  {transaction.date}
                </span>


                <span className="status">
                  ✓ {transaction.status}
                </span>


                <strong
                  className={`table-amount ${transaction.type}`}
                >
                  {transaction.amount}
                </strong>

              </div>

            ))}

          </div>

        </section>


        {/* AI Information */}
        <section className="transaction-ai">

          <div className="transaction-ai-icon">
            ✦
          </div>

          <div>

            <h3>AI Transaction Monitoring</h3>

            <p>
              SmartBank analyzes transaction amount,
              location and frequency to identify
              potentially suspicious activity.
            </p>

          </div>

          <Link to="/dashboard">
            View AI Insights →
          </Link>

        </section>

      </main>

    </div>
  );
}

export default Transactions;