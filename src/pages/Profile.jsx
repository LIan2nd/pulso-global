import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import formatDate from '../utils/formatDate';
import HomeButton from '../components/Navigate/HomeButton';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();
  const [userData, setUserData] = useState(user);

  const [formData, setFormData] = useState({ ...userData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setEditMode(false);
    // Here you would typically send data to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <HomeButton />
      <div className="max-w-2xl mx-auto bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-700">


        {/* Header */}
        <div className="bg-gray-900/50 p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Profile</h1>
            {/* {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Edit Profile
              </button>
            )} */}
            <p className="text-gray-400 mt-1">Member since {formatDate(userData.registeredAt)}</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">First Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                  required
                />
              ) : (
                <p className="p-2 bg-gray-700/50 rounded">{userData.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Last Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                  required
                />
              ) : (
                <p className="p-2 bg-gray-700/50 rounded">{userData.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                  required
                />
              ) : (
                <p className="p-2 bg-gray-700/50 rounded">{userData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
              {editMode ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
              ) : (
                <p className="p-2 bg-gray-700/50 rounded">{userData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Date of Birth</label>
              {editMode ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
              ) : (
                <p className="p-2 bg-gray-700/50 rounded">
                  {formatDate(user.dateOfBirth)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              {editMode ? (
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                  placeholder="Enter new password"
                />
              ) : (
                <p className="p-2 bg-gray-700/50 rounded">{atob(user.passwordHash)}</p>
              )}
            </div>
          </div>

          {editMode && (
            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={() => {
                  setFormData(userData);
                  setEditMode(false);
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;