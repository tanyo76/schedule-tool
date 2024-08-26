import { DateObject } from "../types/app.types";

export const downloadFile = (data: DateObject) => {
  const fileName = `from${data.startDate}to${data.endDate}`;
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
