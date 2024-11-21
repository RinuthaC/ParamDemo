/* This file was generated from JSON Schema using quicktype, do not modify it directly. */
/* Converting the JSON Schema to TypeScript interface. */

interface RootObject {
  woId: number;
  isPcChecklistRequired: boolean;
  isPcChecklistCompleted: boolean;
  isPcChecklistMarkedNo: boolean;
  lineItems: LineItem[];
  assets: Asset[];
  leadAssignee: number;
  tasks: Task[];
  isNAResponse: IsNAResponse[];
  isPrimary: boolean;
}

interface IsNAResponse {
  id: number;
  name: string;
  code: string;
}

interface Task {
  assetId: number;
  taskCheckLists: TaskCheckList[];
}

interface TaskCheckList {
  woTaskId: number;
  lineItemId: number;
  taskGroupId: number;
  taskGroupName: string;
  remarks: string;
  capturedValue: string;
  images: any[];
  isDoneWithIssue: boolean;
  selectedNAId: number;
  isCompleted: boolean;
}

interface Asset {
  id: number;
  sequence: number;
  name: string;
  isCompleted: boolean;
  isDoneWithIssue: boolean;
  completionPer: number;
}

interface LineItem {
  lineItemId: number;
  description: string;
  weightage: number;
  imageCapture: boolean;
  valueCapture: boolean;
  isNA: boolean;
  referenceValue: string;
}