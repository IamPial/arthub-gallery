import RoleChangeModal from "@/components/dashboard/admin/RoleChangeModal";
import { getAllUsers } from "@/lib/api/users";
import { Table } from "@heroui/react";
import { FiUser, FiShield, FiFeather } from "react-icons/fi";

export const metadata = {
  title: "ArtHub- Dashboard User Managements",
  description:
    "ArtHub is a digital platform that connects art lovers, collectors, and buyers with talented artists.",
};




const AdminManageAllUsersPage = async () => {
  const allUsers = await getAllUsers();

  return (
    <Table className="bg-[#1a163a]/40 border border-white/5 rounded-2xl">
      <Table.ScrollContainer>
        <Table.Content aria-label="Manage Users Table">
          <Table.Header className="bg-[#131129] border-b border-white/5">
            <Table.Column isRowHeader className="text-left">
              Name
            </Table.Column>
            <Table.Column className="text-left">Email</Table.Column>
            <Table.Column className="text-left">Role</Table.Column>
            <Table.Column className="text-right">Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {allUsers.map((user) => (
              <Table.Row
                key={user?._id}
                className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors"
              >
                <Table.Cell className="font-semibold text-white">
                  {user?.name}
                </Table.Cell>
                <Table.Cell className="text-slate-400">
                  {user?.email}
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                      user?.role === "admin"
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        : user?.role === "artist"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {user?.role === "admin" ? (
                      <FiShield size={12} />
                    ) : user?.role === "artist" ? (
                      <FiFeather size={12} />
                    ) : (
                      <FiUser size={12} />
                    )}
                    {user?.role}
                  </span>
                </Table.Cell>

                {/* Actions: এক লাইনে ২টি বাটন সুন্দরভাবে পাশাপাশি বসবে */}
                <Table.Cell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {user?.role !== "buyer" && (
                      <RoleChangeModal
                        user={user}
                        targetRole="buyer"
                        label="Make Buyer"
                      />
                    )}
                    {user?.role !== "artist" && (
                      <RoleChangeModal
                        user={user}
                        targetRole="artist"
                        label="Make Artist"
                      />
                    )}
                    {user?.role !== "admin" && (
                      <RoleChangeModal
                        user={user}
                        targetRole="admin"
                        label="Make Admin"
                      />
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer />
    </Table>
  );
};

export default AdminManageAllUsersPage;
