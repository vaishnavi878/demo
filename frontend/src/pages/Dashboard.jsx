import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // User is not logged in
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    fetch(`http://127.0.0.1:5000/api/dashboard/${user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Dashboard data:", data);

        setDashboard(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);

        setError("Unable to load dashboard data.");
        setLoading(false);
      });
  }, [navigate]);

  // Loading screen
  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>{error}</h2>
        <p>
          Make sure your Flask backend is running on port 5000.
        </p>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  const { user, summary, transactions } = dashboard;

  // Calculate this month's net amount
  const thisMonth =
    Number(summary.income) - Number(summary.expenses);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            S
          </div>

          <div>
            <h2>SmartBank</h2>
            <span>Digital Banking</span>
          </div>

        </div>


        <nav className="sidebar-nav">

          <Link
            to="/dashboard"
            className="nav-item active"
          >
            <span>⌂</span>
            Dashboard
          </Link>


          <Link
            to="/accounts"
            className="nav-item"
          >
            <span>▣</span>
            Accounts
          </Link>


          <Link
            to="/transfer"
            className="nav-item"
          >
            <span>↗</span>
            Transfer Money
          </Link>


          <Link
            to="/transactions"
            className="nav-item"
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


          <button
            className="nav-item logout"
            onClick={handleLogout}
            style={{
              border: "none",
              background: "none",
              width: "100%",
              textAlign: "left",
              cursor: "pointer"
            }}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="dashboard-main">


        {/* ================= HEADER ================= */}

        <header className="dashboard-header">

          <div>

            <h1>
              Good morning, {user.name} 👋
            </h1>

            <p>
              Here's what's happening with your finances today.
            </p>

          </div>


          <div className="profile-area">

            <button className="notification-btn">
              🔔
            </button>


            <div className="profile-avatar">
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>


            <div className="profile-info">

              <strong>
                {user.name}
              </strong>

              <span>
                Customer
              </span>

            </div>

          </div>

        </header>


        {/* ================= OVERVIEW ================= */}

        <section className="overview-grid">


          {/* TOTAL BALANCE */}

          <div className="balance-card">

            <div className="card-top">

              <span>
                Total Balance
              </span>

              <span className="card-icon">
                ₹
              </span>

            </div>


            <h2>
              ₹
              {Number(
                summary.total_balance
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </h2>


            <p>
              Available balance
            </p>

          </div>


          {/* THIS MONTH */}

          <div className="overview-card">

            <div className="card-top">

              <span>
                This Month
              </span>

              <span className="income-icon">
                ↗
              </span>

            </div>


            <h2>
              ₹
              {Math.abs(thisMonth).toLocaleString("en-IN")}
            </h2>


            <p className="positive">
              Net amount this month
            </p>

          </div>


          {/* TOTAL INCOME */}

          <div className="overview-card">

            <div className="card-top">

              <span>
                Total Income
              </span>

              <span className="income-icon">
                ↑
              </span>

            </div>


            <h2>
              ₹
              {Number(
                summary.income
              ).toLocaleString("en-IN")}
            </h2>


            <p className="positive">
              This month's income
            </p>

          </div>


          {/* TOTAL EXPENSES */}

          <div className="overview-card">

            <div className="card-top">

              <span>
                Total Expenses
              </span>

              <span className="expense-icon">
                ↓
              </span>

            </div>


            <h2>
              ₹
              {Number(
                summary.expenses
              ).toLocaleString("en-IN")}
            </h2>


            <p className="negative">
              This month's expenses
            </p>

          </div>

        </section>


        {/* ================= QUICK ACTIONS ================= */}

        <section className="section">

          <div className="section-title">
            <h2>Quick Actions</h2>
          </div>


          <div className="quick-actions">


            <Link
              to="/transfer"
              className="action-card"
            >

              <div className="action-icon blue">
                ↗
              </div>

              <div>
                <strong>
                  Transfer Money
                </strong>

                <span>
                  Send money securely
                </span>
              </div>

            </Link>


            <Link
              to="/accounts"
              className="action-card"
            >

              <div className="action-icon purple">
                +
              </div>

              <div>

                <strong>
                  Manage Accounts
                </strong>

                <span>
                  View your accounts
                </span>

              </div>

            </Link>


            <Link
              to="/transactions"
              className="action-card"
            >

              <div className="action-icon green">
                ↔
              </div>

              <div>

                <strong>
                  Transactions
                </strong>

                <span>
                  View transaction history
                </span>

              </div>

            </Link>

          </div>

        </section>


        {/* ================= BOTTOM GRID ================= */}

        <div className="dashboard-grid">


          {/* ================= RECENT TRANSACTIONS ================= */}

          <section className="panel">

            <div className="panel-header">

              <h2>
                Recent Transactions
              </h2>

              <Link to="/transactions">
                View all
              </Link>

            </div>


            <div className="transaction-list">

              {transactions.length === 0 ? (

                <p>
                  No transactions yet.
                </p>

              ) : (

                transactions.map((transaction) => (

                  <div
                    className="transaction-row"
                    key={transaction.id}
                  >

                    <div className="transaction-left">

                      <div
                        className={`transaction-icon ${
                          transaction.direction === "income"
                            ? "salary"
                            : "shopping"
                        }`}
                      >
                        {transaction.direction === "income"
                          ? "₹"
                          : "🛍"}
                      </div>


                      <div>

                        <strong>
                          {transaction.name}
                        </strong>

                        <span>
                          {transaction.category} •{" "}
                          {transaction.date}
                        </span>

                      </div>

                    </div>


                    <strong
                      className={
                        transaction.direction === "income"
                          ? "amount income"
                          : "amount expense"
                      }
                    >

                      {transaction.direction === "income"
                        ? "+"
                        : "-"}

                      ₹
                      {Math.abs(
                        Number(transaction.amount)
                      ).toLocaleString("en-IN")}

                    </strong>

                  </div>

                ))

              )}

            </div>

          </section>


          {/* ================= AI INSIGHTS ================= */}

          <section className="panel ai-panel">

            <div className="ai-header">

              <div className="ai-title">

                <div className="ai-icon">
                  ✦
                </div>

                <div>

                  <h2>
                    AI Insights
                  </h2>

                  <span>
                    Smart analysis of your spending
                  </span>

                </div>

              </div>

            </div>


            <div className="insight-box">

              <div className="insight-icon">
                📊
              </div>

              <div>

                <strong>
                  Spending Analysis
                </strong>

                <p>
                  You spent{" "}
                  <b>
                    ₹
                    {Number(
                      summary.expenses
                    ).toLocaleString("en-IN")}
                  </b>{" "}
                  this month.
                </p>

              </div>

            </div>


            <div className="insight-box">

              <div className="insight-icon">
                🛍
              </div>

              <div>

                <strong>
                  Transaction Activity
                </strong>

                <p>
                  You have{" "}
                  <b>
                    {transactions.length}
                  </b>{" "}
                  recent transactions.
                </p>

              </div>

            </div>


            <div className="insight-box warning">

              <div className="insight-icon">
                💰
              </div>

              <div>

                <strong>
                  Savings
                </strong>

                <p>
                  Your net amount this month is{" "}
                  <b>
                    ₹
                    {Math.abs(
                      thisMonth
                    ).toLocaleString("en-IN")}
                  </b>.
                </p>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;