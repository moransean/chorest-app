import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useGroups } from '../../hooks/useGroups';
import { useParams, useNavigate } from 'react-router-dom';
import { ListTodo, Users, PlusCircle, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/DashboardPage.css';
import { CreateGroupDto } from '../../types/group.types';
import { groupService } from '../../services/group.service';

export const DashboardPage: React.FC = () => {
  const { groupId, assigneeId } = useParams<{ groupId: string, assigneeId: string }>();
  const { userTasks } = useTasks(groupId ?? "", assigneeId ?? "");
  const { groups } = useGroups();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');

  // Display a loading spinner or message while the user data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect or show a message if the user is not logged in
    return <div>Please log in to access the dashboard.</div>;
  }

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!newGroupName.trim()) return; // Prevent empty submissions
  
    const newGroup: CreateGroupDto = { name: newGroupName }; // Initialize DTO here
  
    try {
      const group = await groupService.createGroup(newGroup); // Pass DTO to service layer
      console.log("Group created successfully:", group);
      // setNewGroupName('');
      // setShowCreateModal(false);
      // Refresh groups list if needed
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };
  

  const handleJoinGroup = () => {
    // e.preventDefault();
    // // Here you would call your API to join a group
    // console.log("Joining group with code:", groupCode);
    // // After joining, you might want to:
    // setGroupCode('');
    // setShowJoinModal(false);
    // // And potentially refresh your groups list
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="dashboard-page">
      {/* Mobile sidebar toggle button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {showSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h2>Group Management</h2>
        </div>
        
        <div className="sidebar-buttons">
          <button className="sidebar-button create-button" onClick={() => setShowCreateModal(true)}>
            <PlusCircle size={20} />
            <span>Create New Group</span>
          </button>
          
          <button className="sidebar-button join-button" onClick={() => setShowJoinModal(true)}>
            <LogIn size={20} />
            <span>Join Existing Group</span>
          </button>
        </div>
        
        {groups && groups.length > 0 && (
          <div className="groups-list">
            <h3>Your Groups</h3>
            <ul>
              {groups.map(group => (
                <li key={group.id} onClick={() => navigate(`/group/${group.id}`)}>
                  {group.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className={`main-content ${showSidebar ? 'shifted' : ''}`}>
        <div className="dashboard-container">
          <h1 className="dashboard-title">Dashboard</h1>
          
          {/* Display the username in the top corner */}
          <div className="username-container">
            {user ? `Hello, ${user.username}` : "Welcome!"}
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">Your Tasks</div>
                <ListTodo className="card-icon" size={24} />
              </div>
              <div className="card-content">
                <div className="value-text">
                  {userTasks?.length || 0} Active Tasks
                </div>
                <p className="subtext">
                  {userTasks?.filter(userTask => userTask.status !== 'COMPLETED').length || 0} pending
                </p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-title">Your Groups</div>
                <Users className="card-icon" size={24} />
              </div>
              <div className="card-content">
                <div className="value-text">
                  {groups?.length || 0} Groups
                </div>
                <p className="subtext"> 
                  Collaborate and track chores together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowCreateModal(false)}>
              <X size={24} />
            </button>
            <h2>Create New Group</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="form-group">
                <label htmlFor="groupName">Group Name</label>
                <input 
                  id="groupName" 
                  type="text" 
                  value={newGroupName} 
                  onChange={(e) => setNewGroupName(e.target.value)} 
                  placeholder="Enter group name"
                  required 
                />
              </div>
              <button type="submit" className="submit-button">Create Group</button>
            </form>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {showJoinModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowJoinModal(false)}>
              <X size={24} />
            </button>
            <h2>Join Existing Group</h2>
            <form onSubmit={handleJoinGroup}>
              <div className="form-group">
                <label htmlFor="groupCode">Group Code</label>
                <input 
                  id="groupCode" 
                  type="text" 
                  value={groupCode} 
                  onChange={(e) => setGroupCode(e.target.value)} 
                  placeholder="Enter group code"
                  required 
                />
              </div>
              <button type="submit" className="submit-button">Join Group</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};