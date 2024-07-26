import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const AddLesson = () => {
  const [courseType, setCourseType] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [addedLessons, setAddedLessons] = useState([]);
  const [lessonTypes, setLessonTypes] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch lesson types
    fetch("http://localhost:8080/handicraftType/allView")
      .then((res) => res.json())
      .then((data) => setLessonTypes(data))
      .catch((error) => console.error("Error fetching lesson types:", error));

    // Fetch instructors
    fetch("http://localhost:8080/instructor/viewAll")
      .then((res) => res.json())
      .then((data) => setInstructors(data))
      .catch((error) => console.error("Error fetching instructors:", error));
  }, []);

  const handleCourseTypeChange = (event) => {
    setCourseType(event.target.value);
    setLessonName(""); // Reset lesson name
  };

  const handleLessonNameChange = (event) => {
    setLessonName(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleInstructorChange = (event) => {
    setSelectedInstructor(event.target.value);
  };

  const addLesson = () => {
    // Add lesson information
    const lesson = {
      courseType,
      lessonName,
      day: selectedDay,
      instructor: selectedInstructor,
    };
    setAddedLessons([...addedLessons, lesson]);

    // Reset fields
    setLessonName("");
    setSelectedDay("");
    setSelectedInstructor("");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Ders Ekleme Sayfası</h1>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Ders Türü:</label>
          <select
            className="border border-gray-400 rounded p-2"
            value={courseType}
            onChange={handleCourseTypeChange}
          >
            <option value="">Seçiniz</option>
            {lessonTypes.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        {courseType && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Ders Adı:</label>
            <input
              type="text"
              className="border border-gray-400 rounded p-2 w-1/2"
              value={lessonName}
              onChange={handleLessonNameChange}
              placeholder="Ders Adını Girin"
            />
          </div>
        )}
        {courseType && lessonName && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Gün:</label>
            <select
              className="border border-gray-400 rounded p-2"
              value={selectedDay}
              onChange={handleDayChange}
            >
              <option value="">Seçiniz</option>
              <option value="MONDAY">Pazartesi</option>
              <option value="TUESDAY">Salı</option>
              <option value="WEDNESDAY">Çarşamba</option>
              <option value="THURSDAY">Perşembe</option>
              <option value="FRIDAY">Cuma</option>
              <option value="SATURDAY">Cumartesi</option>
              <option value="SUNDAY">Pazar</option>
            </select>
          </div>
        )}
        {courseType && lessonName && selectedDay && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Eğitmen:</label>
            <select
              className="border border-gray-400 rounded p-2"
              value={selectedInstructor}
              onChange={handleInstructorChange}
            >
              <option value="">Seçiniz</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name} {instructor.surname}
                </option>
              ))}
            </select>
          </div>
        )}
        {courseType && lessonName && selectedDay && selectedInstructor && (
          <div className="mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={addLesson}
            >
              Ekle
            </button>
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold mb-2">Eklenen Dersler</h2>
          <ul>
            {addedLessons.map((lesson, index) => (
              <li key={index}>
                <strong className="text-2xl px-5">{lesson.lessonName}</strong> (
                {lesson.courseType}) - {lesson.day} - {lesson.instructor}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddLesson;
