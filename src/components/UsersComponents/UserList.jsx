import React from "react";
import UserCard from "./UserCard";

const UserList = ({ users, onDelete }) => (
  <div className="overflow-x-auto ">
    <table className="w-full bg-white ">
      <thead>
        <tr className="w-full bg-gray-200 text-gray-700 uppercase text-sm leading-normal ">
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">Email</th>
          <th className="py-3 px-6 text-left">Images</th>
          <th className="py-3 px-6 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="text-black text-md ">
        {users.map((user) => (
          <UserCard key={user._id} user={user} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  </div>
);

export default UserList;


// import React from "react";
// import UserCard from "./UserCard";

// const UserList = ({ users }) => {
//   const [userList, setUserList] = React.useState(users);

//   const handleDelete = (userId) => {
//     setUserList(userList.filter((user) => user._id !== userId));
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white rounded-md shadow-md">
//         <thead>
//           <tr>
//             <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Name
//             </th>
//             <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Email
//             </th>
//             <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Images
//             </th>
//             <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {userList.map((user) => (
//             <UserCard key={user._id} user={user} onDelete={handleDelete} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserList;
