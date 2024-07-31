import { BatchModal } from "@/components/modals/batch-modal";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export const AddBatchButton = ({ activeBranch }: { activeBranch: string }) => {
  return (
    <BatchModal
      initialData={{
        formData: {
          branch: activeBranch,
        },
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"} className="text-md">
          Add Batch
        </Button>
      </DialogTrigger>
    </BatchModal>
  );
};
