'use client'

import { useState, useEffect } from "react";
import { DataTable } from "@/components/table/DataTable";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { columns } from "@/components/table/columns";

// Initial Doctors Array
const initialDoctors = [
  { name: "John Green" },
  { name: "Leila Cameron" },
  { name: "David Livingston" },
  { name: "Evan Peter" },
  { name: "Jane Powell" },
  { name: "Alex Ramirez" },
  { name: "Jasmine Lee" },
  { name: "Alyana Cruz" },
  { name: "Hardik Sharma" },
];

const Admin = () => {
  const [appointments, setAppointments] = useState({ scheduledCount: 0, pendingCount: 0, cancelledCount: 0, documents: [] });
  const [doctors, setDoctors] = useState(initialDoctors); // Manage doctors state
  const [doctorName, setDoctorName] = useState(""); // Manage doctor name input

  // Fetch appointments using useEffect
  useEffect(() => {
    const fetchAppointments = async () => {
      const result = await getRecentAppointmentList();
      setAppointments(result);
    };

    fetchAppointments();
  }, []);

  // Handle adding a new doctor to the array
  const handleAddDoctor = () => {
    if (doctorName.trim()) {
      setDoctors((prevDoctors) => [...prevDoctors, { name: doctorName }]); // Append new doctor
      setDoctorName(""); // Reset input field after submission
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome to MedXpert 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>

          {/* Add Doctor Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 outline hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300">
                + Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Add a New Doctor</DialogTitle>
                <DialogDescription>
                  Enter the doctor's name to add them to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Doctor Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter doctor's name"
                    value={doctorName} // Controlled input
                    onChange={(e) => setDoctorName(e.target.value)} // Update input state
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={handleAddDoctor} // Call the function to add doctor
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save Doctor
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Display Doctors List */}
          <section className="doctors-list">
            <h2 className="text-lg font-semibold">Current Doctors:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="bg-white border border-blue-200 rounded-lg p-3 shadow-sm transition-all duration-300 transform hover:scale-105 hover:bg-blue-100 hover:border-blue-300"
                >
                  <p className="text-sm font-medium text-gray-800">{doctor.name}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
