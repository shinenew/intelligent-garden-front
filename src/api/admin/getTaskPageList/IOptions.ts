import IPagging from "@/constant/DataModel/IPagging";
export default interface IOptions extends IPagging {
  objType?: number;
  objName?: string;
  startDate?: number;
  endDate?: number;
  status?: number;
}