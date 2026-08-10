import React, { useState } from "react";

const CLEAR_HISTORY_PASSWORD = "timesLogInHis2026";

const LoginHistory = () => {

  const history =
    JSON.parse(localStorage.getItem("adminLoginHistory")) || [];

  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [password, setPassword] = useState("");

  const handleClearHistory = () => {

    if (password === CLEAR_HISTORY_PASSWORD) {

      localStorage.removeItem("adminLoginHistory");

      alert("Login history cleared successfully!");

      setPassword("");
      setShowPasswordBox(false);

      window.location.reload();

    } else {

      alert("Incorrect security password!");

    }
  };

  return (
    <div className="container py-5 mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

        <h2 className="fw-bold">
          <i className="fas fa-history me-2"></i>
          Admin Login History
        </h2>

        <button
          className="btn btn-danger fw-bold"
          onClick={() => setShowPasswordBox(!showPasswordBox)}
        >
          <i className="fas fa-trash me-2"></i>
          Clear History
        </button>

      </div>

      {showPasswordBox && (
        <div className="card border-0 shadow-sm mb-4">

          <div className="card-body">

            <h5 className="fw-bold mb-3">
              Security Verification
            </h5>

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter Security Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn btn-dark fw-bold"
              onClick={handleClearHistory}
            >
              Verify & Clear
            </button>

          </div>
        </div>
      )}

      {history.length === 0 ? (

        <div className="alert alert-warning">
          No login history found.
        </div>

      ) : (

        <div className="table-responsive shadow rounded">

          <table className="table table-bordered table-hover align-middle mb-0">

            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Login Time</th>
                <th>Device / Browser</th>
              </tr>
            </thead>

            <tbody>

              {history.map((item, index) => (

                <tr key={index}>

                  <td>{index + 1}</td>

                  <td className="fw-bold text-primary">
                    {item.email}
                  </td>

                  <td>{item.time}</td>

                  <td>{item.device}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default LoginHistory;