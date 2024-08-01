import { Employee } from "./employee";

export interface ApiResponse {
  success: boolean;
  data: Employee[];
}
