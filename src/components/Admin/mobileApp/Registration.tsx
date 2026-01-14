import { useState, useEffect } from "react";
import axios from "axios";
import "./CreateUserForm.css";
const apiurl = import.meta.env.VITE_API_BASE_URL;

// Define User type
interface User {
  fullName: string;
  email: string;
  course: string;
  amount: number;
  certificate: string;  // always "Pending"
  status: string;       // Pending or Completed
  duration: string;     // "3 Months"
}

export default function CreateUserWithTable() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [testing, SetTesting] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Fetch users from backend API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiurl}/api/MobileApp/Fetch`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching users from API");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    if (!fullName || !email || !course || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newUser: User = {
      fullName,
      email,
      course,
      amount: Number(amount),
      duration: "3 Months",
      certificate: "Pending",
      status: "Pending",
    };

    try {
      const response = await axios.post(`${apiurl}/api/MobileApp/Register`, newUser);
      SetTesting(response.data.message);
      console.log(testing)
      alert(response.data.message);

      if (response.data.success) {
        setFullName("");
        setEmail("");
        setCourse("");
        setAmount("");
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
      alert("Error sending data to API.");
    }
  };

  // Delete user
  const handleDelete = async (email: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await axios.delete(`${apiurl}/api/MobileApp/Delete/${email}`);
      alert(response.data.message || "User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Error deleting user.");
    }
  };

  const filteredUsers = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="form-container">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ol>
          <li><a href="#">Dashboard</a></li>
          <li className="active">Create User</li>
        </ol>
      </nav>

      <div className="form-card">
        <h2>Create New User</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Course</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">Select a course</option>
              <option value="Website Design">Website Design</option>
              <option value="Backend Design">Backend Design</option>
              <option value="Mobile App">Mobile App</option>
              <option value="IT Fundamental">IT Fundamental</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Data Analysis">Data Analysis</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="form-group button-group">
            <label>&nbsp;</label>
            <button className="submit-btn" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="table-container">
        <h3>User List</h3>

        <input
          type="text"
          placeholder="Search by full name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Amount</th>
              <th>Duration</th>
              <th>Certificate</th>
              <th>Status</th>
              <th>Action</th> {/* Delete Button */}
            </tr>
          </thead>

          <tbody>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.course}</td>
                  <td>₦{user.amount}</td>
                  <td>{user.duration}</td>
                  <td>{user.certificate}</td>
                  <td>{user.status}</td>
                <td>
  <button
    className="btn btn-danger btn-sm"
    onClick={() => handleDelete(user.email)}
    title="Delete User"
  >
    <i className="bi bi-trash"></i>
  </button>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
