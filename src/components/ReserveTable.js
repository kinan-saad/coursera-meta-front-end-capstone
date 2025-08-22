import React, { useState } from "react";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);      // 1..12
const MINUTES = Array.from({ length: 60 }, (_, i) => i);        // 0..59
const PERIODS = ["AM", "PM"];

const pad2 = (n) => (n < 10 ? `0${n}` : `${n}`);

const parseTime = (t) => {
  // Expects "H:MM AM/PM"
  if (!t) return { hour: 12, minute: 0, period: "PM" };
  const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return { hour: 12, minute: 0, period: "PM" };
  return {
    hour: Math.min(12, Math.max(1, parseInt(m[1], 10))),
    minute: Math.min(59, Math.max(0, parseInt(m[2], 10))),
    period: m[3].toUpperCase() === "AM" ? "AM" : "PM",
  };
};

const ReserveTable = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    date: "",
    time: "",
    diners: 1,
    occasion: "",
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // temp state for the time modal
  const initial = parseTime(formData.time);
  const [tempHour, setTempHour] = useState(initial.hour);
  const [tempMinute, setTempMinute] = useState(initial.minute);
  const [tempPeriod, setTempPeriod] = useState(initial.period);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    else if (formData.firstName.length < 2 || formData.firstName.length > 30)
      newErrors.firstName = "First name must be 2–30 characters";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (formData.lastName.length < 2 || formData.lastName.length > 30)
      newErrors.lastName = "Last name must be 2–30 characters";

    if (!formData.date) newErrors.date = "Please select a reservation date";
    if (!formData.time) newErrors.time = "Please select a reservation time";

    if (formData.diners < 1 || formData.diners > 10)
      newErrors.diners = "Diners must be between 1 and 10";

    if (!formData.occasion) newErrors.occasion = "Please select an occasion";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Reservation submitted successfully!");
      console.log("Form Data:", formData);
      setFormData({
        firstName: "",
        lastName: "",
        date: "",
        time: "",
        diners: 1,
        occasion: "",
      });
    }
  };

  const openTimePicker = () => {
    const { hour, minute, period } = parseTime(formData.time);
    setTempHour(hour);
    setTempMinute(minute);
    setTempPeriod(period);
    setShowTimePicker(true);
  };

  const closeTimePicker = () => setShowTimePicker(false);

  const confirmTime = () => {
    const value = `${tempHour}:${pad2(tempMinute)} ${tempPeriod}`;
    setFormData((p) => ({ ...p, time: value }));
    setShowTimePicker(false);
  };

  return (
    <main className="reservation-container">
      <h1>Reserve a Table at Little Lemon</h1>

      <form onSubmit={handleSubmit} className="reservation-form">
        {/* First Name */}
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </label>

        {/* Last Name */}
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </label>

        {/* Date Picker */}
        <label>
          Date of Reservation:
          <input
            type="text"
            readOnly
            value={formData.date}
            placeholder="Select Date"
            onClick={() => setShowDatePicker((s) => !s)}
          />
          {showDatePicker && (
            <input
              type="date"
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, date: e.target.value }));
                setShowDatePicker(false);
              }}
              className="overlay-input"
            />
          )}
          {errors.date && <span className="error">{errors.date}</span>}
        </label>

        {/* Time Picker (3 columns) */}
        <label>
          Time of Reservation:
          <input
            type="text"
            readOnly
            value={formData.time}
            placeholder="Select Time"
            onClick={openTimePicker}
          />
          {errors.time && <span className="error">{errors.time}</span>}
        </label>

        {/* Diners */}
        <label>
          Number of Diners:
          <input
            type="number"
            name="diners"
            min="1"
            max="10"
            value={formData.diners}
            onChange={handleChange}
          />
          {errors.diners && <span className="error">{errors.diners}</span>}
        </label>

        {/* Occasion */}
        <label>
          Occasion:
          <select
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
          >
            <option value="">Select Occasion</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
          {errors.occasion && <span className="error">{errors.occasion}</span>}
        </label>

        {/* Submit */}
        <button type="submit" className="submit-btn">Reserve Table</button>
      </form>

      {/* Time Modal */}
      {showTimePicker && (
        <div
          className="time-modal-backdrop"
          onClick={closeTimePicker}
          aria-hidden="true"
        >
          <div
            className="time-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Choose reservation time"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="time-modal-title">Select Time</h3>

            <div className="time-columns" role="group" aria-label="Time selector">
              {/* Hours */}
              <div className="time-column" aria-label="Hours">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    className={`time-item ${h === tempHour ? "selected" : ""}`}
                    onClick={() => setTempHour(h)}
                  >
                    {h}
                  </button>
                ))}
              </div>

              {/* Minutes */}
              <div className="time-column" aria-label="Minutes">
                {MINUTES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`time-item ${m === tempMinute ? "selected" : ""}`}
                    onClick={() => setTempMinute(m)}
                  >
                    {pad2(m)}
                  </button>
                ))}
              </div>

              {/* AM/PM */}
              <div className="time-column period" aria-label="AM or PM">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`time-item ${p === tempPeriod ? "selected" : ""}`}
                    onClick={() => setTempPeriod(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="time-actions">
              <button type="button" className="btn ghost" onClick={closeTimePicker}>
                Cancel
              </button>
              <button type="button" className="btn confirm" onClick={confirmTime}>
                Set Time
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ReserveTable;
