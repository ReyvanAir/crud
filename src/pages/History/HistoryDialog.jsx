import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function HistoryDialog({ open, onClose, data }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Match Detail</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <table className="mt-4 w-full select-text">
            <thead className="bg-tertiary text-neutral-100 border border-tertiary">
              <tr>
                <th className="py-2 px-2 whitespace-nowrap">USERNAME</th>
                <th className="py-2 px-2 whitespace-nowrap">K/D</th>
                <th className="py-2 px-2 whitespace-nowrap">SCORE</th>
              </tr>
            </thead>
            <tbody
              className="border border-tertiary"
              style={{ backgroundColor: "#FDF3D3" }}
            >
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="px-2 border-y border-tertiary whitespace-nowrap">
                    {row.username}
                  </td>
                  <td className="px-2 border-y border-tertiary whitespace-nowrap">
                    {row.kill} / {row.death}
                  </td>
                  <td className="px-2 border-y border-tertiary whitespace-nowrap">
                    {row.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
