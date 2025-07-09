import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ListTodo, Users, PlusCircle, LogIn, Menu, X } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useGroups } from '../../hooks/useGroups';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CreateTaskDTO, Task } from '../../types/task.types';
import { User } from '../../types/api.types';
import '../../styles/GroupsPage.css';
import { CreateGroupDto } from '../../types/group.types';
import { groupService } from '../../services/group.service';
import { set } from 'react-hook-form';
import { taskService } from '../../services/task.service';
import { useQuery } from '@tanstack/react-query';

export const GroupsPage: React.FC = () => {
  const { groupId, assigneeId } = useParams<{ groupId: string, assigneeId: string}>();
  const [taskId, setTaskId] = useState<string | null>("");
  const { groupTasks, leaderboard, taskById, refetchGroupTasks, refetchTaskById, refetchLeaderboard } = useTasks(groupId ?? "", assigneeId ?? "", taskId ?? "");
  const { groups, refetchGroups } = useGroups();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showTaskCard, setShowTaskCard] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [pointType, setPointType] = useState('total');
  const [newGroupName, setNewGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [taskValue, setTaskValue] = useState(10);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user && !isLoading) {
    navigate('/login');
  }
  

  const statusSections: Array<'INCOMPLETED' | 'COMPLETED'> = [
    'INCOMPLETED',
    'COMPLETED',
  ];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
      e.preventDefault();
    
      if (!newGroupName.trim()) return; // Prevent empty submissions
    
      const newGroup: CreateGroupDto = { name: newGroupName }; // Initialize DTO here
    
      try {
        await groupService.createGroup(newGroup) // Pass DTO to service layer
        .then(() => {
            setNewGroupName('');
            setShowCreateModal(false);
            refetchGroups();
          })
        // Refresh groups list if needed
      } catch (error) {
        console.error("Failed to create group:", error);
      }
    };

    const handleJoinGroup = (e: React.FormEvent) => {
      e.preventDefault();
    
      if (!groupCode.trim()) return; // Prevent empty submissions

      try {
        // Assuming you have a service method to join a group by code
        groupService.addMember(groupId ?? "", groupCode)
          .then((group) => {
            console.log("Joined group successfully:", group);
          })
          .catch((error) => {
            console.error("Failed to join group:", error);
          });
      } catch (error) {
        console.error("Error joining group:", error);
      }
    // // After joining, you might want to:
     setShowJoinModal(false);
     setGroupCode('');
    };

    const handleCompleteTask = (taskId: string) => {
      try {
        taskService.completeTask(taskId)
          .then(() => {
            refetchGroupTasks();
            refetchTaskById();
            refetchLeaderboard();
          })
          .catch((error) => {
            console.error("Failed to complete task:", error);
          });
      } catch (error) {
        console.error("Error completing task:", error);
      }
    }

    const handleCreateTask = (e: React.FormEvent) => {
      e.preventDefault();

      if (!taskTitle.trim()) return; // Prevent empty submissions
      if (!taskDescription.trim()) return; 
      if (!taskDueDate) return; 
      if (!taskValue) return; 

      const newTask: CreateTaskDTO = {
        title: taskTitle,
        description: taskDescription,
        pointValue: taskValue,
        dueDate: new Date(taskDueDate).toISOString(),
        groupId: groupId ?? "",
      };

      taskService.createTask(newTask)
        .then((task) => {
          console.log("Task created successfully:", task);
          setShowCreateTaskModal(false);
          setTaskTitle('');
          setTaskDescription('');
          setTaskDueDate('');
          setTaskValue(10);
          refetchGroupTasks();
        })
        .catch((error) => {
          console.error("Failed to create task:", error);
        });
    }

  return (
  <div className="dashboard-page">
    {/* Mobile sidebar toggle button */}
    <button className="sidebar-toggle" onClick={() => setShowSidebar(!showSidebar)}>
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
          <span>Add Member to Group</span>
        </button>
      </div>

      {groups && groups.length > 0 && (
        <div className="groups-list">
          <h3>Your Groups</h3>
          <ul>
            {groups.map(group => (
              <li key={group.id} onClick={() => navigate(`/groups/${group.id}`)}>
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
        <h1 className="dashboard-title">Group Dashboard</h1>
        <div className="username-container">
          {user ? `Hello, ${user.username}` : "Welcome!"}
        </div>

        {taskById?.id && showTaskCard  && (
          <div className="task-popup-overlay" onClick={() => setShowTaskCard(false)}>
          <div className="task-card" onClick={(e) => e.stopPropagation()}>
            <h1 className="task-title">{taskById.title}</h1>

            <p className="task-details">
            <span className="task-label">Description:</span> {taskById.description}
            </p>

            <p className="task-details">
            <span className="task-label">Status:</span> {taskById.status}
            </p>

            <p className="task-details">
            <span className="task-label">Point Value:</span> {taskById.pointValue}
            </p>

            <p className="task-details">
            <span className="task-label">Due Date:</span>{' '}
            {new Date(taskById.dueDate).toLocaleString()}
            </p>

            <p className="task-details">
            <span className="task-label">Created At:</span>{' '}
            {new Date(taskById.createdAt).toLocaleString()}
            </p>

            {taskById.status == 'COMPLETED' && (
            <p className="task-details">
                <span className="task-label">Completed At:</span>{' '}
                {new Date(taskById.completedAt).toLocaleString()}
            </p>
            )}

            {taskById.status == 'COMPLETED' && (
            <p className="task-details">
                <span className="task-label">Completed By:</span>{' '}
                {taskById.assignee.username}
            </p>
            )}
          
            {taskById.status == 'INCOMPLETED' && (
              <button
                onClick={() => {
                handleCompleteTask(taskById.id);
                setShowTaskCard(false);
                refetchGroupTasks();
                refetchTaskById();
                }}
            className="task-action-button"
            >
            COMPLETE
          </button>
            )}
        </div>
        </div>
        )}

        {/* Leaderboard */}
        <div style={{ padding: '1rem' }}>
          <div className="dashboard-card leaderboard-card" style={{ width: '95.25%' }}>
            <div className="card-header flex justify-between items-center">
              <div className="card-title">
                {pointType === 'weekly'
                  ? '🏅 Weekly Leaderboard'
                  : pointType === 'monthly'
                  ? '📅 Monthly Leaderboard'
                  : '🏆 Total Leaderboard'}
              </div>
              <select
                value={pointType}
                onChange={(e) => setPointType(e.target.value)}
                className="custom-dropdown"
              >
                <option value="total">Total</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="card-content">
              <ul className="space-y-2">
                {leaderboard?.length ? (
                  leaderboard.map((user, index) => (
                    <li
                      key={user.username}
                      className="flex justify-between px-4 py-2 bg-gray-100 rounded-md"
                    >
                      <span>
                        {index + 1}. {user.username} {' '}
                      </span>
                      <span>
                        {pointType === 'weekly'
                          ? user.weeklyPoints
                          : pointType === 'monthly'
                          ? user.monthlyPoints
                          : user.totalPoints}{' '}
                        pts
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No leaderboard data</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Create Task Tab */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            className="submit-button"
            onClick={() => setShowCreateTaskModal(true)}
            style={{
              padding: '10px 10px',
              borderRadius: '8px',
              backgroundColor: '#007bff',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '1155px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              transition: 'background-color 0.3s ease',
            }}
          >
            + Create Task
          </button>
        </div>


        {/* Tasks by Status */}
        <div style={{ overflowX: 'auto', padding: '1rem' }}>
          <div style={{ display: 'flex', gap: '16px', minWidth: 'max-content' }}>
            {statusSections.map((status) => (
              <div key={status} className="dashboard-card status-card">
                <div className="card-header">
                  <div className="card-title">{status.replace('_', ' ')}</div>
                </div>
                <div className="card-content">
                  {groupTasks?.filter((task) => task.status === status).length ? (
                    <ul className="task-list">
                      {groupTasks
                        .filter((task) => task.status === status)
                        .map((task: Task) => (
                          <li key={task.id} className="task-item" 
                            onClick={() => 
                              {
                                setTaskId(task.id);
                                setShowTaskCard(true);
                              }
                            }>
                            {task.title}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="subtext">No tasks in this category.</p>
                  )}
                </div>
              </div>
            ))}
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
                <h2>Add Member to Group</h2>
                <form onSubmit={handleJoinGroup}>
                  <div className="form-group">
                    <label htmlFor="groupCode">Username</label>
                    <input 
                      id="groupCode" 
                      type="text" 
                      value={groupCode} 
                      onChange={(e) => setGroupCode(e.target.value)} 
                      placeholder="Enter username"
                      required 
                    />
                  </div>
                  <button type="submit" className="submit-button">Add to Group</button>
                </form>
              </div>
            </div>
          )}

          {/* Create Task Modal */}
          {showCreateTaskModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="close-button" onClick={() => setShowCreateTaskModal(false)}>
                  <X size={24} />
                </button>
                <h2>Create New Task</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateTask(e);
                    setShowCreateTaskModal(false);
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="taskTitle">Title</label>
                    <input id="taskTitle" type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}  placeholder="Enter task title" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="taskDescription">Description</label>
                    <input id="taskDescription" type="text" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Enter task description" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="taskPointValue">Point Value</label>
                    <input id="taskPointValue" type="number" value={taskValue} onChange={(e) => setTaskValue(Number(e.target.value))} placeholder="10" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="taskDueDate">Due Date</label>
                    <input id="taskDueDate" type="datetime-local" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} required />
                  </div>
                  <button type="submit" className="submit-button" onSubmit={handleCreateTask}>Create Task</button>
                </form>
              </div>
            </div>
          )}

  </div>
);


};

