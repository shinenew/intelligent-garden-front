import IPagging from "@/constant/DataModel/IPagging";
export default interface IOptions extends IPagging {
  companyId?: number;
  companyName?: string;
  status?: number;
  userName?: string;
}