import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Plus, Grid, List } from "lucide-react";
import { fetchDoctors, setPage } from "../../store/slices/doctorsSlice";
import DoctorCard from "./DoctorCard";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Spinner from "../ui/Spinner";

const DoctorList = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { doctors, total, page, limit, totalPages, isLoading } = useSelector(
    (state) => state.doctors
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const canCreateDoctor = user?.role === "admin";

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              Doctors
            </h1>
            <p className="text-gray-600 text-sm">
              Manage doctor profiles efficiently
            </p>
          </div>

          {canCreateDoctor && (
            <Button 
              onClick={() => navigate("/doctors/new")}
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium text-sm">Add Doctor</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Showing {doctors.length} of {total} doctors
        </p>
        {totalPages > 1 && (
          <p>
            Page {page} of {totalPages}
          </p>
        )}
      </div>

      {/* Doctor List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-300 mb-4">
            <Search className="h-full w-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No doctors found
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Try adjusting your search criteria"
              : "Get started by adding your first doctor"}
          </p>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "primary" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorList;
