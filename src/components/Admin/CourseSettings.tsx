import axios from "axios";
import { useState, useEffect } from "react";

const apiurl = import.meta.env.VITE_API_BASE_URL;

// ✅ Course type
interface Course {
  _id: string;
  title: string;
  Description: string;
  image?: string;
}

// ✅ Extend for editing to include new image
interface EditingCourse extends Course {
  newImage?: File | null;
}

export default function CourseSettings() {
  const [message, setMessage] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<EditingCourse | null>(null);

  // ✅ Fetch courses on load
  useEffect(() => {
    fetchCourses();
  }, []);

  function fetchCourses() {
    axios
      .get<{ message: Course[] }>(`${apiurl}/api/Course/fetch`)
      .then((res) => setCourses(res.data.message))
      .catch((err) => console.error("Error fetching courses:", err));
  }

  // ✅ Edit course
  function handleEdit(course: Course) {
    setEditingCourse(course);
  }

  // ✅ Update course with optional new image
  function handleUpdateWithImage() {
    if (!editingCourse || !editingCourse._id) return;

    const formData = new FormData();
    formData.append("title", editingCourse.title);
    formData.append("Description", editingCourse.Description);

    if (editingCourse.newImage) {
      formData.append("image", editingCourse.newImage);
    }

    axios
      .put(`${apiurl}/api/Course/edit/${editingCourse._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setMessage(res.data.message);
        setEditingCourse(null);
        fetchCourses();
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error updating course");
      });
  }

  // ✅ Delete course
  function handleDelete(courseId: string) {
    axios
      .delete(`${apiurl}/api/Course/delete/${courseId}`)
      .then((res) => {
        setMessage(res.data.message);
        fetchCourses();
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error deleting course");
      });
  }

  // ✅ Auto-hide success alert
  function Alert() {
    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => setMessage(""), 3000);
        return () => clearTimeout(timer);
      }
    }, []);

    return message ? (
      <div
        className="alert alert-success text-center position-fixed top-50 start-50 translate-middle"
        role="alert"
        style={{ zIndex: 1050, minWidth: "250px" }}
      >
        {message}
      </div>
    ) : null;
  }

  // ✅ Buttons for each course
  function CourseButton({ courseId }: { courseId?: string }) {
    return (
      <div className="d-flex gap-2 mt-2 justify-content-center">
        <button
          onClick={() => {
            const course = courses.find((c) => c._id === courseId);
            if (course) handleEdit(course);
          }}
          className="btn btn-sm btn-outline-warning"
        >
          Edit
        </button>
        <button
          onClick={() => courseId && handleDelete(courseId)}
          className="btn btn-sm btn-outline-danger"
        >
          Delete
        </button>
      </div>
    );
  }

  return (
    <section className="p-4">
      <Alert />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Course Settings
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm p-4 form-card">
        <h5 className="text-primary mb-3 fw-semibold">Courses</h5>

        {/* ✅ Display all courses */}
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4 mb-3">
              <div className="card shadow-sm p-3 text-center">
                {course.image && (
                  <img
                    src={`${apiurl}/imgCourse/${course.image}`}
                    alt={course.title}
                    className="course-img mb-3 rounded"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      margin: "0 auto",
                    }}
                  />
                )}
                <h6 className="fw-semibold">{course.title}</h6>
                <p className="text-muted mb-2">{course.Description}</p>
                <CourseButton courseId={course._id} />
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Edit Course Form */}
        {editingCourse && (
          <div className="card shadow p-4 mt-4">
            <h5>Edit Course</h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateWithImage();
              }}
            >
              {/* Title & Description */}
              <input
                type="text"
                className="form-control mb-2"
                value={editingCourse.title}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, title: e.target.value })
                }
                placeholder="Course Title"
              />
              <textarea
                className="form-control mb-2"
                value={editingCourse.Description}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, Description: e.target.value })
                }
                placeholder="Course Description"
              />

              {/* Image Preview */}
              <div className="mb-2 text-center">
                {editingCourse.newImage ? (
                  <img
                    src={URL.createObjectURL(editingCourse.newImage)}
                    alt="Preview"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : editingCourse.image ? (
                  <img
                    src={`${apiurl}/imgCourse/${editingCourse.image}`}
                    alt={editingCourse.title}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : null}
              </div>

              {/* File Input */}
              <input
                type="file"
                className="form-control mb-3"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEditingCourse({
                      ...editingCourse,
                      newImage: e.target.files[0],
                    });
                  }
                }}
              />

              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setEditingCourse(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
