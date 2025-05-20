// import React, { useState } from 'react';
// import { 
//   PlusCircle, 
//   Users, 
//   Copy, 
//   Check 
// } from 'lucide-react';
// import { Button } from '../../@/components/ui/button';
// import { Card } from '../../@/components/ui/card';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../@/components/ui/dialog';
// import { useGroups } from '../../hooks/useGroups';
// import { Toast } from '../../@/components/ui/toast';

// export const GroupsPage: React.FC = () => {
//   const { groups, createGroup, /*joinGroup,*/ currentGroup, setCurrentGroup } = useGroups();
//   const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
//   const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
//   const [newGroupName, setNewGroupName] = useState('');
//   const [groupCode, setGroupCode] = useState('');
//   const [copiedGroupCode, setCopiedGroupCode] = useState<string | null>(null);

//   const handleCreateGroup = async () => {
//     if (newGroupName) {
//       await createGroup({ name: newGroupName });
//       setIsCreateDialogOpen(false);
//       setNewGroupName('');
//     }
//   };

//   const handleJoinGroup = async () => {
//     if (groupCode) {
//       await joinGroup(groupCode);
//       setIsJoinDialogOpen(false);
//       setGroupCode('');
//     }
//   };

//   const handleCopyGroupCode = (code: string) => {
//     navigator.clipboard.writeText(code);
//     setCopiedGroupCode(code);
//     setTimeout(() => setCopiedGroupCode(null), 2000);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Your Groups</h1>
//         <div className="flex space-x-2">
//           <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
//             <DialogTrigger asChild>
//               <Button variant="default" className="flex items-center space-x-2">
//                 <PlusCircle />
//                 <span>Create Group</span>
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Create New Group</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block mb-2">Group Name</label>
//                   <input
//                     type="text"
//                     value={newGroupName}
//                     onChange={(e) => setNewGroupName(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter group name"
//                   />
//                 </div>
//                 <Button 
//                   onClick={handleCreateGroup} 
//                   disabled={!newGroupName}
//                   className="w-full"
//                 >
//                   Create Group
//                 </Button>
//               </div>
//             </DialogContent>
//           </Dialog>

//           <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
//             <DialogTrigger asChild>
//               <Button variant="secondary" className="flex items-center space-x-2">
//                 <Users />
//                 <span>Join Group</span>
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Join a Group</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block mb-2">Group Code</label>
//                   <input
//                     type="text"
//                     value={groupCode}
//                     onChange={(e) => setGroupCode(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter group code"
//                   />
//                 </div>
//                 <Button 
//                   onClick={handleJoinGroup} 
//                   disabled={!groupCode}
//                   className="w-full"
//                 >
//                   Join Group
//                 </Button>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {groups && groups.length === 0 && (
//         <div className="text-center text-gray-500 py-8">
//           <Users className="mx-auto mb-4" size={48} />
//           <p>You haven't joined any groups yet. Create or join a group!</p>
//         </div>
//       )}

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {groups?.map((group) => (
//           <Card 
//             key={group.id} 
//             className={`p-4 flex flex-col justify-between cursor-pointer ${
//               currentGroup?.id === group.id ? 'border-2 border-primary' : ''
//             }`}
//             onClick={() => setCurrentGroup(group)}

export {}