import { AlertDialog, Button } from "@heroui/react";

const RoleChangeModal = ({ user, targetRole, label, variantColor }) => {

  const colorStyles = {
    buyer: "text-blue-400 hover:border-blue-500/40",
    artist: "text-purple-400 hover:border-purple-500/40",
    admin: "text-rose-400 hover:border-rose-500/40",
  };

  const currentStyle = colorStyles[targetRole] || "text-slate-400";

  return (
    <AlertDialog>
      <Button
        size="sm"
        className={`bg-[#131129] border border-white/5 rounded-lg text-xs font-medium transition-all duration-200 px-3 py-1 ${currentStyle}`}
      >
        {label}
      </Button>

      <AlertDialog.Backdrop className="backdrop-blur-sm bg-black/60 fixed inset-0 z-50 overflow-y-auto">
        <AlertDialog.Container className="min-h-full w-full flex items-center justify-center p-4 text-center">
          <AlertDialog.Dialog className="bg-[#13102e] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative text-left align-middle inline-block">
            <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer" />

            <AlertDialog.Header className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#6f4ff2]/10 rounded-xl text-[#6f4ff2]">
                <AlertDialog.Icon className="w-5 h-5" />
              </div>
              <AlertDialog.Heading className="text-xl font-bold text-white tracking-wide">
                Confirm Role Change
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="text-sm text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to change{" "}
              <span className="text-white font-semibold">
                {user?.name}&apos;s{" "}
              </span>
              role to{" "}
              <span className="text-[#6f4ff2] font-bold uppercase">
                {targetRole}
              </span>
              ? This will modify their permissions immediately.
            </AlertDialog.Body>

            <AlertDialog.Footer className="flex justify-end gap-3">
              <Button className="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 font-medium rounded-xl transition-all">
                Cancel
              </Button>
              <Button className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#6f4ff2]/20">
                Confirm Change
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default RoleChangeModal;
