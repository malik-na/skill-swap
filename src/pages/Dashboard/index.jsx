import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../components/Firebase";
import Select from "react-select";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: "",
    title: "",
    skillsOffered: [],
    skillsNeeded: [],
  });

  // Skill options for the select component
  const skillOptions = [
    { label: "Web Development", value: "web-development" },
    { label: "UI/UX Design", value: "ui-ux-design" },
    { label: "Spanish", value: "spanish" },
    { label: "Photography", value: "photography" },
    // Add more skills as needed
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser?.uid) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setEditForm({
            displayName: data.displayName || "",
            title: data.title || "",
            skillsOffered: data.skillsOffered || [],
            skillsNeeded: data.skillsNeeded || [],
          });
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "users", currentUser.uid), editForm);
      setUserData(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const getSkillStyle = (skill) => {
    if (
      [
        "Web Development",
        "UI/UX Design",
        "Programming",
        "Software Development",
      ].includes(skill)
    ) {
      return "bg-blue-100 text-blue-800";
    }
    if (
      [
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
        "Japanese",
      ].includes(skill)
    ) {
      return "bg-green-100 text-green-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  if (!userData) return null;

  return (
    <div className="p-8">
      <div className="profile p-8 rounded-lg shadow-lg bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Profile Overview</h1>
          {!isEditing ? (
            <button
              onClick={() => {
                console.log("Setting isEditing to true");
                setIsEditing(true);
              }}
              className="border-2 border-black rounded-lg px-4 py-2 hover:bg-black transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="border-2 border-gray-400 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="border-2 border-blue-600 bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700 hover:border-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl text-white">
              {editForm.displayName?.charAt(0) ||
                userData.email?.charAt(0) ||
                "U"}
            </span>
          </div>

          <div className="flex flex-col gap-6 flex-grow">
            {isEditing ? (
              // Edit Mode
              <>
                <div>
                  <input
                    type="text"
                    value={editForm.displayName}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        displayName: e.target.value,
                      }))
                    }
                    className="text-2xl font-bold mb-1 border-2 rounded px-2 py-1 w-full"
                    placeholder="Your Name"
                  />
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="text-gray-600 border-2 rounded px-2 py-1 w-full mt-2"
                    placeholder="Your Title/Occupation"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Skills Offered:</h3>
                  <Select
                    isMulti
                    options={skillOptions}
                    value={editForm.skillsOffered}
                    onChange={(selected) =>
                      setEditForm((prev) => ({
                        ...prev,
                        skillsOffered: selected || [],
                      }))
                    }
                    className="mb-4"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Skills Needed:</h3>
                  <Select
                    isMulti
                    options={skillOptions}
                    value={editForm.skillsNeeded}
                    onChange={(selected) =>
                      setEditForm((prev) => ({
                        ...prev,
                        skillsNeeded: selected || [],
                      }))
                    }
                  />
                </div>
              </>
            ) : (
              // View Mode
              <>
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {userData.displayName ||
                      userData.email?.split("@")[0] ||
                      "User"}
                  </h2>
                  <p className="text-gray-600">
                    {userData.title || "Skills Exchange Member"}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Skills Offered:</h3>
                  <div className="flex flex-wrap gap-3">
                    {userData.skillsOffered?.map((skill) => (
                      <span
                        key={skill.value}
                        className={`px-4 py-2 rounded-full ${getSkillStyle(
                          skill.label
                        )}`}
                      >
                        {skill.label}
                      </span>
                    ))}
                    {(!userData.skillsOffered ||
                      userData.skillsOffered.length === 0) && (
                        <span className="text-gray-500 italic">
                          No skills offered yet
                        </span>
                      )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Skills Needed:</h3>
                  <div className="flex flex-wrap gap-3">
                    {userData.skillsNeeded?.map((skill) => (
                      <span
                        key={skill.value}
                        className={`px-4 py-2 rounded-full ${getSkillStyle(
                          skill.label
                        )}`}
                      >
                        {skill.label}
                      </span>
                    ))}
                    {(!userData.skillsNeeded ||
                      userData.skillsNeeded.length === 0) && (
                        <span className="text-gray-500 italic">
                          No skills needed specified
                        </span>
                      )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="skill-matches p-8 rounded-lg shadow-lg bg-white mt-8">
          <h1 className="text-2xl font-bold">Skill Matches</h1>
        <div className="flex mb-8 justify-evenly">
          <div className="card-1 flex flex-col gap-4 p-6 rounded-lg shadow-lg items-center justify-between w-1/3 m-6 bg-gray-100">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-xl font-semibold mb-3">John Doe</h3>
              <p className="text-blue">85% Match</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <img src="" alt="location" />
              <p>New York</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Skills Offered:</h4>
              <p className="bg-green text-center p-2 m-2 rounded-full">Spanish</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Skills Needed:</h4>
              <p className="bg-green text-center p-2 m-2 rounded-full">Spanish</p>
            </div>
            <button className="py-1 px-4 bg-[#000000] text-white rounded hover:opacity-90 w-full">
              View Profile
            </button>
          </div>
          <div className="card-1 flex flex-col gap-4 p-6 rounded-lg shadow-lg items-center justify-between w-1/3 m-6 bg-gray-100">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-xl font-semibold mb-3">John Doe</h3>
              <p className="text-blue">85% Match</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <img src="" alt="location" />
              <p>New York</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Skills Offered:</h4>
              <p className="bg-green text-center p-2 m-2 rounded-full">Spanish</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Skills Needed:</h4>
              <p className="bg-green text-center p-2 m-2 rounded-full">Spanish</p>
            </div>
            <button className="py-1 px-4 bg-[#000000] text-white rounded hover:opacity-90 w-full">
              View Profile
            </button>
          </div>
        </div>
      </div>
      {/* Add this code right after the closing div of skill-matches section */}
<div className="recent-activity p-8 rounded-lg shadow-lg bg-white mt-8">
  <h1 className="text-2xl font-bold">Recent Activity</h1>
  <div className="mt-6 space-y-4">
    <div className="activity-item flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue rounded-full flex items-center justify-center">
          <span className="text-white text-xl">JS</span>
        </div>
        <div>
          <p className="font-semibold">Jane Smith shared a new skill</p>
          <p className="text-gray-600 text-sm">Added Python Programming</p>
        </div>
      </div>
      <span className="text-gray-500 text-sm">2 hours ago</span>
    </div>

    <div className="activity-item flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-green rounded-full flex items-center justify-center">
          <span className="text-white text-xl">MB</span>
        </div>
        <div>
          <p className="font-semibold">Mike Brown requested a skill swap</p>
          <p className="text-gray-600 text-sm">Web Development for Spanish</p>
        </div>
      </div>
      <span className="text-gray-500 text-sm">5 hours ago</span>
    </div>

    <div className="activity-item flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-purple rounded-full flex items-center justify-center">
          <span className="text-white text-xl">AL</span>
        </div>
        <div>
          <p className="font-semibold">Amy Lee accepted your request</p>
          <p className="text-gray-600 text-sm">UI/UX Design sessions scheduled</p>
        </div>
      </div>
      <span className="text-gray-500 text-sm">1 day ago</span>
    </div>
  </div>
</div>
    </div>
  ); 
};

export default Dashboard;
